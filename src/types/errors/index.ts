export interface FieldViolationMsg {
    name: string,
    value?: string,
    msg: string
}
export interface ValidationError extends Error {
    fields: FieldViolationMsg[]
}
