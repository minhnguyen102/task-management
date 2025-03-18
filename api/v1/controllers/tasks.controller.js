const Task = require("../models/task.model")
const paginationHelper = require("../../../helpers/pagination")

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
            limitItem : 2, // tránh truyền cứng số 5 khi ứng dụng vào các trang khác 
            currentPage : 1,
        },
        req.query, totalTask);
    console.log(objectPagination)
    //end pagination

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
        res.json("Khong tim thay")
    }
}