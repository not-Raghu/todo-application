import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";

export const getTodos = async (req,res) =>{
    try {
        const todoData = await Todo.find({ createdBy: req.user._id });

        const todos = todoData.map((todo)=>{
            const data = {
                title: todo.title,
                _id: todo._id
            }
            return data;
        });

        return res.status(200).json({
            success: true,
            todos: todos
        });

    } catch (err) {
        console.log("Error in getTodos" , err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const uploadTodo = async (req,res) =>{
    try {
        const { title } = req.body;
        const createdTodo = await Todo.create({
            title,
            completed: false,
            createdBy: req.user._id
        });
        
        if(!createdTodo){
            return res.status(400).json({
                success: false,
                message: "Error creating todo"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Created todo successfully"
        });

    } catch (err) {
        console.log("error in uploading todo" , err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }
}

export const updateTodo = async (req,res) =>{
    try {
        const { todoId , title} = req.body;
        const updated = await Todo.findByIdAndUpdate(todoId,{title},{new:true});

        if(!todoId || !title){
            return res.status(400).json({
                success: true,
                message: "send todoId and title"
            })
        }

        if(!updated){
            return res.status(404).json({
                success: false,
                message:" Todo not found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Updated todo successfully",
            data: updateTodo
        });
        
    } catch (err) {
        console.log("Error in updating todo" , err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const deleteTodo = async (req,res) =>{
    try {
        const { todoId } = req.body;

        
        if(!todoId){
            return res.status(400).json({
                success:false,
                message: "Todo Id required"
            });
        }


        
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if(!deletedTodo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "deleted todo"
        })
    } catch (err) {
        console.log("Error in deleteTodo" , err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}