const express = require('express');
const cors = require('cors');


const server = express();
server.use(cors());
server.use(express.json());

const port = process.env.PORT || 3000;

const Post = require('./models/post')
// Root route
//server.get('/', (req, res) => res.send('Hello, world!'))

server.get('/', async (req, res) => {
    try {
        const posts = await Post.all
        res.json({posts})
    } catch(err) {
        res.status(500).json({err})
    }
})

server.post('/', async (req,res) => {
    const data = req.body;
    const post = await Post.create(data)
    res.status(201).json({post})
})

server.get('/:id', async (req,res) => {
    const id = req.params.id
    const post = await Post.findById(id)
    res.status(200).json({post})
})

module.exports = server