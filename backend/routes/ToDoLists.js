const express = require('express')
const router = express.Router()
const ToDoList = require('../models/ToDoList')

router.get('/', (req, res) => {
    var taskType = req.query.tasks
    var find_query
    if (taskType == 1) {
        find_query = {}
    } else if (taskType == 2) {
        find_query = { task_status: false }
    } else {
        find_query = { task_status: true }
    }
    
    ToDoList.find(find_query, (error, tasks) => {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        }
        else {
            res.json({
                data: tasks,
                message: 'Fetched tasks successfully'
            })
        }
    })
})
router.get('/:id', (req, res) => {
    ToDoList.findById(req.params.id, (error, task) => {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        }
        else {
            res.json({
                data: task,
                message: 'Fetched task successfully'
            })
        }
    })
})

router.post('/', (req, res) => {
    ToDoList.create(req.body, (error, task) => {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        }
        else {
            res.json({
                data: task,
                message: 'Created task successfully'
            })
        }
    })
})

router.put('/:id', (req, res) => {
    ToDoList.findByIdAndUpdate(req.params.id, req.body, (error, task) => {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        } else {
            res.status(200).json({
                message: 'Task Successfully Updated',
                data: task
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    ToDoList.findByIdAndRemove(req.params.id, req.body, (error, task) => {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        } else {
            res.status(200).json({
                message: 'Task Successfully Deleted',
                data: task
            })
        }
    })
})
module.exports = router