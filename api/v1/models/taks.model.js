const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    createAt : Date,
    updatedAt: Date,
    deleted: {
        type: Boolean,
        default: false
    },
},{ timestamps: true });

const Task = mongoose.model('Task', taskSchema, "task");

module.exports = Task;