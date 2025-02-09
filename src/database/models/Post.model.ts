import { post } from "../../../types/post";
import mongoose, { Schema } from "mongoose";

const postSchema = new Schema<post>(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Who posted it?"],
    },
    author:{
      type:String,
      required:[true,"Author name is required"]
    },
    title: {
      type: String,
      required: [true, "Title of the post is required"],
    },
    content: {
      type: String,
      required: [true, "Title of the post is required"],
    },
    category: [
      { type: String, required: [true, "What category of post is this"] },
    ],
    media: {
      type: String,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
      }],
  },
  { timestamps: true }
);

const PostModel =
  (mongoose.models.Post as mongoose.Model<post>) ||
  mongoose.model<post>("Post", postSchema);

  export default PostModel
