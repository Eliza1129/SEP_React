const express = require('express');
const app = express();
const todoRouter = require('./routes/todos');
const authMiddleware = require('./middleware/authMiddleware');
const authRouter = require('./routes/auth');
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello from Todo backend");
});


app.use('/auth', authRouter);
app.use('/todos', authMiddleware, todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})