const express = require('express');
const router = express.Router();

const { 
    getTaskList,
    newTask,
    taskDelete,
    statusTask,
    doneTask,
    getDoneTaskList
} = require("../controllers/task.controller")

router.get('/list', getTaskList);
router.get('/doneList', getDoneTaskList);
/**
 * Route that create a new task.
 */
router.post('/new', newTask);

/**
 * Route that delete the task.
 */
router.post('/delete', taskDelete);

/**
 * Route that change the status.
 */
router.post('/status', statusTask);

/**
 * Route that change the status.
 */
router.post('/done', doneTask);
    
module.exports = router;