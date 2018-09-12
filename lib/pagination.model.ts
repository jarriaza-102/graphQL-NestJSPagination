export class PaginationModel {
    pageIndex: number;
    pageSize: number
    totalPages: number;
    totalElements: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export class Pager {
    data: any;
    pagination: PaginationModel;
}