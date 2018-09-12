import { PaginationModel, Pager } from "./pagination.model";

const PAGE_SIZE = 2;
const PAGE_INDEX = 0;

function getCurrentSkipLevel(pageIndex: number, pageSize: number) {
    return (pageSize > 0) ? pageIndex * pageSize : pageSize;
}

export function getPaginationData(args): Pagination {
    const pageIndex = args.pageIndex || PAGE_INDEX;
    const pageSize = args.pageSize || PAGE_SIZE;
    return new Pagination(
        getCurrentSkipLevel(pageIndex, pageSize),
        pageSize
    );
}

export function getPager(data: any, count: number, pagination: Pagination): Pager {
    const pager = new Pager();
    pager.data = data;
    pager.pagination = getPaginationOptions(count, pagination);
    return pager;
}

function getPaginationOptions(count: number, pagination: Pagination): PaginationModel {
    const paginationModel = new PaginationModel();
    paginationModel.pageSize = pagination.limit;
    paginationModel.pageIndex = pagination.skip / pagination.limit;
    paginationModel.totalElements = count;
    paginationModel.totalPages = Math.ceil(count / pagination.limit);
    paginationModel.hasPrevPage = paginationModel.pageIndex > 0;
    paginationModel.hasNextPage = paginationModel.pageIndex < paginationModel.totalPages - 1;
    return paginationModel;
}

export class Pagination {
    skip: number = 0;
    limit: number = 10;

    constructor(skip: number, limit: number) {
        this.skip = skip;
        this.limit = limit
    }
}