//This is needed because when we receive the data from the Web API server,
//we need to store them as an array of certain type of elements but of what type?
//Well of type EntryElement which will have the same fields as an actual entry
//from the Web API.
export interface EntryElement {
    Id: number;
    Description: string;
    IsExpense: boolean;
    Value: number;
}