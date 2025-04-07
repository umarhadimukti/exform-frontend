export interface Form
{
    id: number,
    title: string,
    description?: string,
    is_public: boolean,
    invites: string[],
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

export interface FormsResponse
{
    currentPage: number
    data: Form[]
    hasNextPage: boolean
    hasPrevPage: boolean
    nextPage: number[]
    prevPage: number[]
    pageSize: number
    status: boolean
    totalData: number
    totalPage: number
}