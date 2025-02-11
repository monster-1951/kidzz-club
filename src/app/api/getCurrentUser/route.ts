;import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";

export async function POST(request: Request) {
  try {
    const { id } = await request.json(); // ✅ Extract id from request body
    console.log(id, "🤖🤖🤖🤖");

    if (!id) {
      return Response.json({
        success: false,
        status: 400,
        error: "ID is required",
      });
    }

    await dbConnect();
    const user = await UserModel.findById(id);

    if (!user) {
      return Response.json({
        success: false,
        status: 400,
        error: "User not found",
      });
    }
    return Response.json({
      success: true,
      status: 200,
      user,
    });
  } catch (error) {
    console.error("Error in finding the user", error);
    return Response.json({
      success: false,
      status: 500,
      error: error,
    });
  }
}
