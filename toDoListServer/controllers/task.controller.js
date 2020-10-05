const Task = require("../models/task.model").Task;

/**
 * Function that shows the list of tasks.
 * @param {*} req 
 * @param {*} res 
 */
async function getTaskList(req, res){
    const tasks = await Task.find({
        isDone: false
    }).sort("-createAt");

    if (tasks) {
        res.json({
            data: tasks
        });
    } else {
        res.json({
            data: []
        });
    }
};

/**
 * Function to make a new task.
 * @param {*} req 
 * @param {*} res 
 */
async function newTask(req, res){
    const body = req.body;
    console.log(body);

    if(body.name && body.desc){
        try{
            const newTask = await new Task({
                name: body.name,
                description: body.desc
            }).save();

            if(newTask) {
                res.json({'data': newTask});
            } else {
                res.status(500).send("ERROR STORING NEW TASK");
            }
    
        } catch(err){
            res.status(500).send("ERROR STORING NEW TASK");
        }
        
    }else {
        res.status(402).send("BAD PARAMETERS");
    }

};

/**
 * Function that delete a task
 * @param {*} req 
 * @param {*} res 
 */
async function taskDelete(req, res){
    const body = req.body;

    if(body.taskId) {
        try{
            const results = await Task.deleteOne({
                _id: body.taskId});

            if(results) {
                res.json({'data': results});
            } else {
                res.status(500).send("ERROR STORING NEW TASKS");
            }

        }catch(err){
            console.log(err)
            res.status(500).send("ERROR DELETING");
        }

    } else {
        res.status(402.).send("BAD PARAMETERS")
    }
    
};

/**
 * Function that updates the status of the task.
 * @param {*} req 
 * @param {*} res 
 */
async function statusTask(req, res){
    const taskId = req.body.id;
    const status = req.body.status;

    if (taskId) {
        try{
            const statusTask = await Task.updateOne({
                id: taskId,
                $set: {
                    status: status
                }
            });

            res.json({
                'data': statusTask
            });

        }catch(err){
            console.log(err)
            res.status(500).send("ERROR")
        }
    } else {
        res.status(402).send("PARAMETROS ERRONEOS")
    }
};

/**
 * Function to make a new task.
 * @param {*} req 
 * @param {*} res 
 */
async function doneTask(req, res){
    const body = req.body;

    if(body.taskId){
        console.log(body.taskId)
        try{
            const task = await Task.updateOne({
                _id: body.taskId},{
                    $set: {
                        isDone: true
                    }
                }  
            );

            if(task) {
                res.json({'data': task});
            } else {
                console.log("else")
                res.status(500).send("ERROR STORING NEW TASK");
            }
    
        } catch(err){
            console.log(err)
            res.status(500).send("ERROR STORING NEW TASK");
        }
        
    }else {
        res.status(402).send("BAD PARAMETERS");
    }

};

async function getDoneTaskList(req, res){
    const tasks = await Task.find({
        isDone: true
    }).sort("-createAt");

    if (tasks) {
        res.json({
            data: tasks
        });
    } else {
        res.json({
            data: []
        });
    }
};


module.exports = {
    getTaskList,
    newTask,
    taskDelete,
    statusTask,
    doneTask,
    getDoneTaskList
};
