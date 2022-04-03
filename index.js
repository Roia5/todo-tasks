const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const tasksByUserId = {};

app.post('/api/v1/task/', (req, res) => {
    const taskId = randomBytes(4).toString('hex');
    const { userId, content } = req.body;

    const tasks = tasksByUserId[userId] || [];
    tasks.push({ id: taskId, content });
    tasksByUserId[userId] = tasks;
    return res.status(201).send(tasks);
});

app.get('/api/v1/tasks', (req, res) => {
    const { userid } = req.body;
    res.send(tasksByUserId[userid] || []);
});

app.get('/api/v1/task/:taskid/', (req, res) => {
    const { userid } = req.body;
    const taskid = req.params.taskid;
    const tasks = tasksByUserId[userid];
    const task = tasks.find((task) => {
        return task.id === taskid;
      });
    res.send(task);
});
app.put('/api/v1/task/:taskid/', (req, res) => {
    const taskid = req.params.taskid;
});
app.patch('/api/v1/task/:taskid/', (req, res) => {
    const taskid = req.params.taskid;
});
app.patch('/api/v1/task/:taskid/', (req, res) => {
    const taskid = req.params.taskid;
});
app.delete('/api/v1/task/:taskid/', (req, res) => {
    const taskid = req.params.taskid;
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});