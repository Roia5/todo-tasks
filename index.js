const express = require('express');

const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

const tasksByUserId = {};

app.post('/api/v1/:userid/tasks/', (req, res) => {
    const taskId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const userId = req.params.userid;

    const tasks = tasksByUserId[userId] || [];
    tasks.push({ id: taskId, content });
    tasksByUserId[userId] = tasks;
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).send(tasks);
});

app.get('/api/v1/:userid/tasks/', (req, res) => {
    const userId = req.params.userid;
    res.send(tasksByUserId[userId] || []);
});

app.get('/api/v1/:userid/tasks/:taskid/', async (req, res) => {
    const { userid } = req.body;
    const taskid = req.params.taskid;
    const tasks = tasksByUserId[userid];
    const task = tasks.find((task) => {
        return task.id === taskid;
      });
    res.send(task);
});
app.put('/api/v1/:userid/tasks/:taskid/', (req, res) => {
    const taskid = req.params.taskid;
});
app.patch('/api/v1/:userid/tasks/:taskid/', (req, res) => {
    const taskid = req.params.taskid;
});
app.patch('/api/v1/:userid/tasks/:taskid/', (req, res) => {
    const taskid = req.params.taskid;
});
app.delete('/api/v1/:userid/tasks/:taskid/', (req, res) => {
    const taskid = req.params.taskid;
});

app.listen(port, () => {
    console.log('Listening on ' + port);
});