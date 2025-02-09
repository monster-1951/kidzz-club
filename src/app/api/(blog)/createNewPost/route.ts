import dbConnect from "@/database/ConnectDB";
import PostModel from "@/database/models/Post.model";
import UserModel from "@/database/models/User.Model";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  await dbConnect();
  const { postedBy, title, content, category, media, id } =
    await request.json();
  const postedBY = await UserModel.findById(postedBy);
  const Post = {
    postedBy,
    author: postedBY?.UserName,
    title,
    content,
    category,
    media,
    id,
  };
  console.log(Post, "🙌");

  try {
    if (Post.id) {
      const updatedPost = await PostModel.findByIdAndUpdate(id, Post);
      revalidatePath("/");
      return Response.json(
        {
          success: true,
          message: "Posted the post",
          updatedPost,
        },
        { status: 201 }
      );
    }
    if (!Post.id) {
      const newPost = await PostModel.create(Post);
      console.log(newPost, "New Post 🍻");

      const updateUser = await UserModel.updateOne(
        { _id: postedBy },
        { $push: { posts: newPost._id } }
      );

      console.log(updateUser, "user updated");

      revalidatePath("/");
      return Response.json(
        {
          success: true,
          message: "Posted the post",
          newPost,
          updateUser,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Error in posting", error);
    return Response.json(
      {
        success: false,
        message: "Error in posting ",
        error,
      },
      { status: 500 }
    );
  }
}
