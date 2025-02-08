import mongoose, { Schema } from "mongoose";
import { User } from "../../../types/user";

const UserSchema = new Schema<User>(
  {
    UserName: { type: String, required: true },
    ParentName: { type: String, required: true },
    Gender: { type: String, enum: ["Male", "Female"], required: true },
    ParentGender: { type: String, enum: ["Male", "Female"], required: true },
    ParentEmail: { type: String, required: true },
    ParentMobileNumber: { type: Number },
    Password: { type: String, required: true },
    DateOfBirth: { type: String, required: true },
    Points:{type:Number,default:0},
    ParentPassword:{type:String,required:true},
    ParentDateOfBirth: { type: String },
    Cart: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }],
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",UserSchema)

export default UserModel