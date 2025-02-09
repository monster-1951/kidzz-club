import { Document, Types } from "mongoose";
import { category } from "./category";
import { User } from "./user";

export interface post extends Document {
  postedBy: Types.ObjectId;
  author: string;
  title: string;
  content: string;
  category:category[],
  media?: string;
  likes?: User[];
}
