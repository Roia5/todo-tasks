const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const quizzesByUserId = {};

app.get('/quizzes/:id', (req, res) => {
    res.send(quizzesByUserId[req.params.id] || []);
});

app.post('/quizzes/:id', (req, res) => {
    const quizId = randomBytes(4).toString('hex');
    const { question } = req.body;

    const quizzes = quizzesByUserId[req.params.id] || [];
    quizzes.push({ id: quizId, question });
    quizzesByUserId[req.params.id] = quizzes;
    return res.status(201).send(quizzes);
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});