const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/note');
const { json } = require('express');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//for testing if its working
app.get('/', (req, res)=>{
    res.json('test ok 2');
})

//posting into database
app.post('/api/notes', async(req, res)=>{
    //connect to mongodb database
    await mongoose.connect(process.env.MONGO_URL)
    //grab all data from req body
    const{title, description, datetime} = req.body;
    //put data inside the Note Model
    const note = await Note.create({title, description, datetime})
    //response with json file
    res.json(note);
})

//getting data from mongodb
app.get('/api/notes', async(req, res)=>{
    await mongoose.connect(process.env.MONGO_URL)
    const note = await Note.find({})
    res.json(note)
})

if(process.env.API_PORT){
    app.listen(process.env.API_PORT);
}

module.exports = app