import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';
import { db_connection } from './database/db.js';

const app = express();
dotenv.config();
app.use(cookieParser());


app.use(express.json());
db_connection();

app.use("/api/auth" , authRoutes);
app.use('/api/todos' , todoRoutes);

app.listen(process.env.PORT, ()=>[
    console.log(`Running on port ${process.env.PORT}`)
]);