const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true, min: 3},
    completed: Boolean,
})

module.exports = mongoose.model('Task' , taskSchema)