import express, { Application } from 'express';
import cors from 'cors';
import { userRouter } from './model/User/user.route.js';

const app: Application = express();


app.use(cors());
app.use(express.json());


app.use('/api/users', userRouter);

export default app;