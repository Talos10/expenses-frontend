//Interface need to represent the type of an entry (expense or income). It is needed
//so that we can display the different types (expense or income) in the drop-down menu.
export interface Type {
    value:boolean;
    display:string;
}