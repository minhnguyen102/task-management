const Task = require("../models/taks.model")
const paginationHelper = require("../../../helpers/pagination")
const searchHelper = require("../../../helpers/search")


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
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    // End Sort

    // Pagination
    let objectPagination = {
        pageCurrent : 1,
        limitItem : 5
    }
    const totalTask = await Task.countDocuments(find)
    paginationHelper(objectPagination, req.query, totalTask);
    // End Pagination

    // Search
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
    // End Search

    

    const task = await Task.find(find)
                        .sort(sort)
                        .limit(objectPagination.limitItem)
                        .skip(objectPagination.skip)
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