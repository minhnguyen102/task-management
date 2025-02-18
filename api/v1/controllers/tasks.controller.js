const Task = require("../models/taks.model")
module.exports.index = async (req, res) =>{
    const task = await Task.find({
        deleted : false
    });

    res.json(task)
}

module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const task = await Task.find({
        _id : id
    })
    res.json(task);
}