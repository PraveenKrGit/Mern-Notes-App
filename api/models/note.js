const mongoose = require('mongoose')
const {Schema, model} = mongoose;


const NoteSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    datetime: {type: Date, required: true},
})

const NoteModel = model('Note', NoteSchema);
module.exports= NoteModel;