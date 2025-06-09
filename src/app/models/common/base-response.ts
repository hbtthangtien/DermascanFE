import { PaginationResponse } from "./pagination-response";

export interface BaseResponse<T> {
    data: T;
    success: boolean;
    message: string;
    error?: Record<string,string>;
    paging?: PaginationResponse;
}