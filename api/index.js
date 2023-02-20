import express from 'express'
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin : ['http://localhost:3000']
}))

app.use(morgan('dev'))

app.post('/register', (req, res) => {
    let { name, email, password} = req.body;
    return res.json(req.body);
})

app.listen(4000,() => {
    console.log('app is running on localhost:4000');
})