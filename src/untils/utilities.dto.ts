import { IsNotEmpty, IsOptional } from "class-validator";


export interface iPagintedResults<T> {
    HasPreviousPage: boolean;
    HasNextPage: boolean;
    PageIndex: number;
    PageSize: number;
    TotalPages: number;
    TotalCount: number;
    ThisCount: number;
    PageResult: T[];
}

export interface iPagintionQuery {
    offset: number, limit: number, getAll?: 'true' | 'false', search?: string, select: string
}


export class PagintionQuery implements iPagintionQuery {
    @IsNotEmpty()
    limit: number

    @IsOptional()
    search: string

    @IsOptional()
    select: string = ''

    @IsOptional()
    getAll: 'true' | 'false'

    @IsNotEmpty()
    offset: number


}