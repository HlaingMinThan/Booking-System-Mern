import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import prisma from './prisma/index.js';

const app = express();

app.use(express.json());

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
                password 
            }
        })
        return res.json(user);
    }catch (e) {
        return res.status(500).send(e.message);
    }
})

app.listen(4000,() => {
    console.log('app is running on localhost:4000');
})