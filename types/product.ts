import { Document } from "mongoose";
import { User } from "./user";

export interface Product extends Document{
    Name:string,
    Price:number,
    Image:string,
    Description:string,
    seller:User,
    status:"available"|"sold",
    ratings:number
    Category:string
}