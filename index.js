// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    
    console.log('userInformation', userInfo);
    if (!userInfo.name || !userInfo.bio){
      
        return res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else { 
        db.insert(userInfo)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: 'There was an error while saving the user to the database'})
        })
    }
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({message: 'The user information could not be retrieved'})
    })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
   
    db.findById(id)
        .then(user => {
            !user ? res.status(404).json({ message: "The user with the specified ID does not exist." }) :
            res.status(200).json(user)
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
    
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
    db.remove(id)
    .then(count => {
        res.status(200).json({ message: `users with id ${id} deleted`})
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to delete the user from the db' })
    })
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    db.update(id, user)
    .then(users => {
        res.status(200).json(user)
    })
    .catch(err => {
        console.log('error', err);
    })
})

const port = 8000;
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));