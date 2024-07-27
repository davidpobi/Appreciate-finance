export interface QueryDefault {
    query: string
}

export interface QueryOption {
    title: string
    message: string
}
export interface QueryState {
    options: Array<QueryOption>
    query: string | null;
}