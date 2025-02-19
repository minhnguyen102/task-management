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

// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        await Task.updateOne(
            {_id : id},
            {status : status}
        )

        res.json({
            code : 200,
            message : "Cập nhật trạng thái sản phẩm thành công"
        })
    } catch (error) {
        res.json({
            code : 404,
            message : "Cập nhật trạng thái sản phẩm thất bại"
        })
    }
    
}

// [PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) =>{
    try {
        const {ids, key, value} = req.body;
    switch (key){
        case "status":
            await Task.updateMany(
                {_id : {$in : ids}},
                {status : value}
            )
            break;
        case "deleted":
            await Task.updateMany(
                {_id : {$in : ids}},
                {deleted : value}
            )
            break;
        default:
            break;
    }
    res.json({
        code : 200,
        message : "Cập nhật trạng thái sản phẩm thành công"
    })

    } catch (error) {
        res.json({
            code : 404,
            message : "Cập nhật trạng thái các sản phẩm không thành côngcông"
        })
    }
}
