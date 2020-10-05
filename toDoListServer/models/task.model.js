const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        values: ["Doing", "In Progress", "Done"],
        default: "Doing"
    }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = {
    Task
};