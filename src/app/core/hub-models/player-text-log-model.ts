export const checkIfTextLogModel = (obj:any): obj is TextLogModel => {
    return obj && 'message' in obj && 'from' in obj;
};

export interface TextLogModel {
    message:string,
    from:string
}
