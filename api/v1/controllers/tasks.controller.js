const Task = require("../models/task.model")
const paginationHelper = require("../../../helpers/pagination")
const searchHelper = require("../../../helpers/search")

module.exports.index = async (req, res) => {
    let find = {
        deleted : false
    }

    //filter-status
    if(req.query.status){
        find.status = req.query.status;
    }

    //sort
    let sort = {};

    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    // end sort

    //pagination
    const totalTask = await Task.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            limitItem : 4, // tránh truyền cứng số 5 khi ứng dụng vào các trang khác 
            currentPage : 1,
        },
        req.query, totalTask);
    //end pagination

    // Search
        const objectSearch = searchHelper(req.query);
        if(objectSearch.regex){
            find.title = objectSearch.regex;
        }
        // chưa thể tìm đa dạng, mới chỉ cho phép không phân biệt chữ hoa chữ thường
    // End Search

    const tasks = await Task.find(find)
                            .sort(sort)
                            .limit(objectPagination.limitItem)
                            .skip(objectPagination.skip)
    res.json(tasks)
}

module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({
            _id : id,
            deleted : false,
        })
        res.json(task)
    } catch (error) {
        res.json({
            code : 400,
            message : "Không tồn tại"
        })
    }
}

module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.updateOne({
            _id : id,
            deleted : false,
        },{
            status : req.body.status
        })
        res.json({
            code : 200,
            message : "Cập nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Không tồn tại"
        })
    }
}

module.exports.changeMulti = async (req, res) => {
    try {
        const {ids, key, value } = req.body;
        switch (key) {
            case "status":
                await Task.updateMany(
                    {_id : {$in : ids}},
                    {$set : {
                        status : value
                    }}
                )
                res.json({
                    code : 200,
                    message : "Thanh cong"
                })
                break;
            default:
                break;
        }
    } catch (error) {
        res.json({
            code : 400,
            message : "Lỗi"
        })
    }
}