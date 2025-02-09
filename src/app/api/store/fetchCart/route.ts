import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";

export async function POST(request: Request) {
  const { UserName } = await request.json();
  await dbConnect();

  try {
    // Fetch user and populate the Cart field with full product details
    const user = await UserModel.findOne({ UserName }).populate("Cart");

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      });
    }

    return Response.json({
      success: true,
      message: "POST Request success",
      products: user.Cart, // Now contains full product objects
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "POST Request Failed",
      error: error,
    });
  }
}
