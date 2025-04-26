import express from 'express';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { getTodos,updateTodo,uploadTodo,deleteTodo } from '../controllers/todos.controllers.js';
const router = express.Router();

router.get('/todo' ,verifyToken , getTodos);
router.post('/todo' ,verifyToken, uploadTodo);
router.put('/todo' ,verifyToken , updateTodo);
router.delete('/todo' ,verifyToken, deleteTodo);

export default router;