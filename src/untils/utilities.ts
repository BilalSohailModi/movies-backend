import { iPagintedResults } from "./utilities.dto";

export const getPaginated = <T>({ data, offset, limit, total }: { data: T[], offset: number, limit: number, total: number }): iPagintedResults<T> => {
    return {
        HasPreviousPage: offset > 0 ? true : false,
        HasNextPage: Number(limit) + Number(offset) >= total ? false : true,
        PageIndex: Math.ceil((offset) / limit),
        PageSize: limit,
        TotalPages: Math.ceil(total / limit),
        TotalCount: total,
        ThisCount: data.length,
        PageResult: data,
    };
};

