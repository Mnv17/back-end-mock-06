require("dotenv").config();
const express = require("express");
const cors = require("cors")
const { connectDB } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { boardRouter } = require("./routes/board.route")
const { taskRouter } = require("./routes/task.route")
const { subTaskRouter } = require("./routes/subtask.route")

const app = express();

app.use(express.json());
app.use(cors())
app.use("/user", userRouter)
app.use("/board", boardRouter)
app.use("/task", taskRouter)
app.use("/subtask", subTaskRouter)


app.get("/", (req, res) => {
    res.send("Welcome to Kanban Board")
})

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`);
});
