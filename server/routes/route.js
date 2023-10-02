const express = require('express');
const Task  = require('../models/TaskModel');
const route = express.Router();

route.post('/tasks' , async (req,res) => {
  try {
    const task = new Task(req.body)
    task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
});

route.get('/tasks', async (req,res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
});

route.patch('/tasks/:id' , async(req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title' , 'completed'];
    const isValidOperation = updates.every((update) => {
        allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid Updates"});
    }

    try {
       const task = await Task.findByIdAndUpdate(req.params.id , req.body , {
        new: true,
        runValidators: true,
       }) 

       if(!task){
         return res.status(404).send({message: "Task Not Found"});
       }
       res.send(task)
    } catch (error) {
        res.status(400).send({message: error})
        
    }
});

route.delete('/tasks/:id' , async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task) {
        return res.status(404).send({message: "Task Not Found"})
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error);
    }
});

route.delete('/tasks' , async(req,res) => {
    try {
        const result = await Task.deleteMany({});

        if(result.deletedCount == 0){
            return res.status(404).send({message: "No Tasks found to delete !"});
        }

        res.send({message : "All Tasks deleted successfully"})

    } catch (error) {
        res.status(500).send({message: error})
    }
})

module.exports = route