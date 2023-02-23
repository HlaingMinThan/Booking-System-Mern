import dotEnv from 'dotenv';
dotEnv.config()
import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import prisma from './prisma/index.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(cookieParser());

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

app.listen(4000,() => {
    console.log('app is running on localhost:4000');
})