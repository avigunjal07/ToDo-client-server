import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

const TODO_ITEMS = ["Go for swimming", "Complete the assignment", "Read the book"];

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to the API",
    });
});

app.get("/hello", (req, res) => {
    return res.json({
        success: true,
        message: "Hello from server",
    });
});

app.get("/todos", (req, res) => {
    return res.json({
        success: true,
        data: TODO_ITEMS,
        message: "TODO items fetched successfully",
    });
});

app.post("/todos", (req, res) => {
    const { todoItem } = req.body;

    if (!todoItem) {
        return res.json({
            success: false,
            message: "TODO item cannot be empty",
        });
    }
    TODO_ITEMS.push(todoItem);

    return res.json({
        success: true,
        data: todoItem,
        message: "TODO item added successfully",
    });
});

app.delete("/todos" , (req , res) => {
    const {todoItem} = req.body;
    const  itemIndex = TODO_ITEMS.indexOf(todoItem);

    if(itemIndex == -1) {
        return res.json({
            success: false,
            message:"todo item not found",
        });
    } else {
        TODO_ITEMS.splice(itemIndex , 1);

        return res.json({
            success: true,
            data: todoItem , 
            message:"TODO item deleted successfully",
        });
    }
});

app.put("/todos" , (req , res) => {
    const {oldTodoItem , newTodoItem} = req.body;

    const itemIndex = TODO_ITEMS.indexOf(oldTodoItem);

    if(itemIndex == -1) {
        return res.json({
            success: false ,
            message: "oldTodoItem not found",
        });
    } else {
        TODO_ITEMS[itemIndex] = newTodoItem;

        return res.json({
            success:true ,
            data: newTodoItem ,
            message: "Todo item added successfully",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});