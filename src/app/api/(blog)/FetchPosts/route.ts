import dbConnect from "@/database/ConnectDB";
import PostModel from "@/database/models/Post.model";

export async function GET(request:Request) {
  await dbConnect();

  try {
    const AllPosts = await PostModel.find().lean().exec();
    return Response.json({
      success: true,
      message: "Fetched Posts Successfully",
      AllPosts,
    });
  } catch (error) {
    console.log("Error in Fetching the posts", error, "😭");
    return Response.json({
      success: true,
      message: "Fetched Posts Successfully",
      error,
    });
  }
}
