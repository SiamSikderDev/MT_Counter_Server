import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DB from './DB.js';
import authRoutes from './routes/user.route.js'
import createRoute from './routes/card.route.js'

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://mtcounter.netlify.app'],
    credentials: true
}))
app.use(express.json())
app.use('/', authRoutes);
app.use('/', createRoute);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    DB(process.env.MONGODB_URI)
})