// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    console.log('userInformation', userInfo);

    db.insert(userInfo)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'could not add the user to the db'})
    })
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({error: 'failed to get users from db'})
    })
});

server.get('api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({error: 'could not get specific user'})
    })
})

server.delete('api/users/:id', (req, res) => {
    const id = req.params.id;
    
    db.remove(id)
    .then(count => {
        res.status(200).json({ message: `users with id ${id} deleted`})
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to delete the user from the db' })
    })
})

const port = 8000;
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));