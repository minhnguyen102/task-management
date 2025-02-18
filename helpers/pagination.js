module.exports = (objectPagination, query, countRecords) => {
    if(query.page){
        objectPagination.pageCurrent = parseInt(query.page);
    }
    if(query.limit){
        objectPagination.limitItem = parseInt(query.limit);
    }
    objectPagination.skip = (objectPagination.pageCurrent - 1) * objectPagination.limitItem;
    
    objectPagination.totalPage = Math.ceil(countRecords / objectPagination.limitItem);
    
    return objectPagination;
}