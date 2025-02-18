const Task = require("../models/taks.model")
// [GET] /api/v1/tasks
module.exports.index = async (req, res) =>{
    let find = {
        deleted : false
    }

    // filterStatus
    if(req.query.status){
        find.status = req.query.status;
    }

    // Sort
    console.log(req.query);
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    // End Sort
    

    const task = await Task.find(find)
                        .sort(sort)
    res.json(task)
}

// [GET] /api/v1/tasks/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const task = await Task.find({
        _id : id
    })
    res.json(task);
}