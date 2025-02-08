import { Document } from "mongoose";
import { Product } from "./product";


export interface User extends Document {
    UserName:string,
    ParentName:string,
    Points?:number,
    Gender:"Male"|"Female",
    ParentGender:"Male"|"Female",
    ParentEmail:string,
    ParentMobileNumber?:number,
    Password:string,
    ParentPassword:string,
    DateOfBirth:string,
    ParentDateOfBirth?:string,
    Cart:Product[]
}