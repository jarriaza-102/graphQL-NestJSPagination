"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pagination_model_1 = require("./pagination.model");
var PAGE_SIZE = 2;
var PAGE_INDEX = 0;
function getCurrentSkipLevel(pageIndex, pageSize) {
    return (pageSize > 0) ? pageIndex * pageSize : pageSize;
}
function getPaginationData(args) {
    var pageIndex = args.pageIndex || PAGE_INDEX;
    var pageSize = args.pageSize || PAGE_SIZE;
    return new Pagination(getCurrentSkipLevel(pageIndex, pageSize), pageSize);
}
exports.getPaginationData = getPaginationData;
function getPager(data, count, pagination) {
    var pager = new pagination_model_1.Pager();
    pager.data = data;
    pager.pagination = getPaginationOptions(count, pagination);
    return pager;
}
exports.getPager = getPager;
function getPaginationOptions(count, pagination) {
    var paginationModel = new pagination_model_1.PaginationModel();
    paginationModel.pageSize = pagination.limit;
    paginationModel.pageIndex = pagination.skip / pagination.limit;
    paginationModel.totalElements = count;
    paginationModel.totalPages = Math.ceil(count / pagination.limit);
    paginationModel.hasPrevPage = paginationModel.pageIndex > 0;
    paginationModel.hasNextPage = paginationModel.pageIndex < paginationModel.totalPages - 1;
    return paginationModel;
}
var Pagination = /** @class */ (function () {
    function Pagination(skip, limit) {
        this.skip = 0;
        this.limit = 10;
        this.skip = skip;
        this.limit = limit;
    }
    return Pagination;
}());
exports.Pagination = Pagination;
