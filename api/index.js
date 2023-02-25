import dotEnv from 'dotenv';
dotEnv.config()
import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import prisma from './prisma/index.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import download from 'image-downloader'
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({
        storage,
        dest: 'uploads/' ,
        // validation
        fileFilter: function (req, file, cb) {
            // Define the allowed file extensions
            const allowedExtensions = /jpeg|jpg|png|gif/;
            const fileExtension = file.originalname.split('.').pop();
        
            // Check if the file extension is allowed
            if (allowedExtensions.test(fileExtension)) {
            cb(null, true);
            } else {
            cb(new Error('Only image files are allowed'));
            }
        }
})

const app = express();

app.use(express.json());
app.use(cookieParser());

const uploadFolderPath = new URL('uploads', import.meta.url).pathname;
app.use('/uploads',express.static(uploadFolderPath))

app.use(cors({
    credentials: true,
    origin : ['http://localhost:3000']
}))

app.use(morgan('dev'))

app.post('/register', async (req, res) => {
    try {
        let { username, email, password} = req.body;
        let user = await prisma.user.create({
            data : {
                username,
                email,
                password : await bcrypt.hash(password,5)
            }
        });
        return res.json(user);
    }catch (e) {
        return res.status(500).send(e.message);
    }
})

app.post('/login', async (req, res) => {
    try {
        let {  email, password} = req.body;
        let user = await prisma.user.findUnique({
            where : {
                email
            }
        })
        if(user) {
            if(await bcrypt.compare(password,user.password)) {
                let token = jwt.sign({
                    id:user.id,
                    email
                },process.env.JWT_SECRET)
                return res.cookie('token',token).json(user);
            }else{
                throw new Error('password incorrect')
            }
        }else{
            throw new Error('User not found')
        }
    }catch (e) {
        return res.status(500).send({
            message : e.message
        });
    }
})

app.get('/me',async (req,res) => {
    let {token} = req.cookies;
    if(token) {
        let userPayload = jwt.verify(token,process.env.JWT_SECRET);
        let user = await prisma.user.findUnique({
            where : {
                email : userPayload.email
            },
            select : {
                id:true,
                email:true,
                username: true,
            }
        })
        return res.send(user);
    }else {
        return res.send(null);
    }
})

app.post('/logout', (req,res) => {
    return res.cookie('token','').send({message : 'logout success'});
})

app.post('/upload-link', async(req,res) => {
    let {url} = req.body;
    const filename = 'photo_'+Date.now()+'.jpg';
    const options = {
        url,
        dest: uploadFolderPath+'/'+filename
    };
    if(url) {
        await download.image(options);
        return res.status(200).send({filename, url: process.env.APP_URL+'uploads/'+filename })
    }else{
        return res.status(422).send('need photo url')
    }
})

app.post('/upload' , upload.array('photos',100),async(req,res) => {
        let photos= [];
        req.files.forEach(file => {
            let {filename} = file;
            photos.push({filename, url: process.env.APP_URL+'uploads/'+filename });
        })
        return res.status(200).send(photos)
});

app.get('/places' , async (req,res) => {
    let places = await prisma.place.findMany(
        {
            include : {
                photos : true
            }
        }
    );
    console.log(places)
    return res.status(200).json(places);
})

app.get('/user-places', async (req,res) => {
    let {token} = req.cookies;
    let user = jwt.verify(token,process.env.JWT_SECRET);
    let places = await prisma.place.findMany({
        where : {
            owner_id : user.id 
        },
        include : {
            photos:true
        }
    });
    return res.status(200).send(places);
});

app.get('/user-places/:id', async (req,res) => {
    let id = +req.params.id;
    let place = await prisma.place.findUnique({
        where : {
            id
        },
        include : {
            features : true,
            photos : true
        }
    });
    return res.status(200).send(place);
});

app.post('/user-places',async (req,res) => {
    let {title, address, description, extraInfo, checkIn, checkOut, maxGuests, photos, features} = req.body
    let {token} = req.cookies;
    let user = jwt.verify(token,process.env.JWT_SECRET);
    let place = await prisma.place.create({
        data : {
            title,
            address,
            description,
            extraInfo,
            checkIn:+checkIn,
            checkOut:+checkOut,
            maxGuests:+maxGuests,
            owner_id : user.id 
        }
    });
    //create photos for created place
    photos = photos.map(p => ({place_id  : place.id,url : p}))
    await prisma.photo.createMany({
        data : photos
    })
    
    //create features for created place
    features = features.map(f => ({name : f,place_id : place.id}))
    await prisma.feature.createMany({
        data : features
    })

    let createdPlace = await prisma.place.findUnique({
        where: {
            id:place.id
        },
        include : {
            owner: true,
            features:true,
            photos:true
        }
    })
    return res.json(createdPlace);
})

app.put('/user-places/:id', async (req,res) => {
    let id = +req.params.id;
    let {title, address, description, extraInfo, checkIn, checkOut, maxGuests, photos, features} = req.body

    //check ownership
    let {token} = req.cookies;
    if(token) {
        let userPayload = jwt.verify(token,process.env.JWT_SECRET);
        let updatePlace = await prisma.place.findUnique({
            where : {
                id
            }
        });
        if(userPayload.id === updatePlace.owner_id) {
            let place = await prisma.place.update({
                where : {
                    id
                },
                data  : {
                    title,
                    address,
                    description,
                    extraInfo,
                    checkIn:+checkIn,
                    checkOut:+checkOut,
                    maxGuests:+maxGuests,
                }
            });
    
            // update photos
            await prisma.photo.deleteMany({
                where : {
                    place_id : place.id
                },
            })
            photos = photos.map(p => ({url : p,place_id : place.id}))
            await prisma.photo.createMany({
                data : photos
            })
            
            // update features
            await prisma.feature.deleteMany({
                where : {
                    place_id : place.id
                },
            })
            features = features.map(f => ({name : f,place_id : place.id}))
            await prisma.feature.createMany({
                data : features
            })
    
            return res.status(200).send(place);
        }
    }
});

app.listen(4000,() => {
    console.log('app is running on localhost:4000');
})