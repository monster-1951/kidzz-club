import dbConnect from "@/database/ConnectDB";
import PostModel from "@/database/models/Post.model";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { postId } = await req.json();

    if (!postId) {
      return Response.json(
        { success: false, message: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await PostModel.findById(postId).lean().exec();

    if (!post) {
      return Response.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Fetched Post Successfully",
      post,
    });
  } catch (error) {
    console.error("Error fetching the post:", error);
    return Response.json(
      { success: false, message: "Error fetching the post" },
      { status: 500 }
    );
  }
}
