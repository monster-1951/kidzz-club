"use server";
import dbConnect from "@/database/ConnectDB";
import PostModel from "@/database/models/Post.model";
import { revalidatePath } from "next/cache";

export const LikePost = async (postId: string, LikedUser: string) => {
  await dbConnect();

  try {
    const post = await PostModel.updateOne(
      { _id: postId },
      { $push: { likes: LikedUser } }
    );
    console.log(post, "Liked");
    revalidatePath("/")
  } catch (error) {
    console.log("Can't like please try again later", error);
  }
};

export const UnLikePost = async (postId: string, UnLikedUser: string) => {
  await dbConnect();

  try {
    const post = await PostModel.updateOne(
      {
        _id: postId,
      },
      { $pull: { likes: UnLikedUser } }
    );

    console.log(post, "unliked");
    revalidatePath("/")
  } catch (error) {
    console.log("Can't unlike please try again later", error);
  }
};
