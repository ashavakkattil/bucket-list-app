const mongoose = require('mongoose')

const Schema = mongoose.Schema

var ToDoListSchema = new Schema({
    task_name: String,
    task_status: Boolean
})

module.exports = mongoose.model('ToDoList', ToDoListSchema)