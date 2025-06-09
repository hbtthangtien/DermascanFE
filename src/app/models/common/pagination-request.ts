export interface PaginationRequest {
    pageIndex: number;
    pageSize: number;
    orderBy?: string;
    isDesc: boolean;
    searchString: string;
}
