const { response } = require("express");
const Task = require('../models/Task');


const getTask = async (req,res=response) => {
    const task = await Task.find();
    res.json({
        ok:true,
        task
    });
}

const createTask = async (req,res=response) => {
    const task = new Task(req.body);
    try {
        const taskDB = await task.save();
        res.json({
            ok:true,
            msg:taskDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error'
        });
    }
}

const updateTask = async( req, res = response ) => {
    
    const taskId = req.params.id;
    
    try {

        const task = await Task.findById( taskId );

        if ( !task ) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no existe por ese id'
            });
        }

        const nuevaTask = {
            ...req.body,
        }

        const taskUpdated = await Task.findByIdAndUpdate( taskId, nuevaTask, { new: true } );

        res.json({
            ok: true,
            task: taskUpdated
        });

        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'task no existe por ese id'
        });
    }
}

const deleteTask = async (req,res = response) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({
                ok:false,
                msg:'Tarea con ese id no existe'
            });
        }
        await Task.findByIdAndDelete(taskId);
        
        res.json({
            ok:true,
            msg:'Tarea eliminada'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error'
        })
    }
}

const findTask = async (req,res = response) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById( taskId );
        res.json({
            ok: true,
            task
        });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Tarea no existe por ese id'
        });
    }
}


module.exports = {
    getTask,
    deleteTask,
    createTask,
    updateTask,
    findTask
}