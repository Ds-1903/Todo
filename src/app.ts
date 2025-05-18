import express, { Application } from 'express';
import cors from 'cors';
import { userRouter } from './model/User/user.route.js';
import { taskRouter } from './model/Task/task.route.js';

const app: Application = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.use('/api/users', userRouter);
app.use('/api/task', taskRouter );



export default app;