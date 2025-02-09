import UserModel from "@/database/models/User.Model";
import dbConnect from "@/database/ConnectDB";

export async function POST(request: Request) {
  const { productId, UserName } = await request.json();
  await dbConnect(); // Connect to the database

  try {
    // Fetch the user by UserName
    const user = await UserModel.findOne({ UserName });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Ensure the user's Cart is treated as an array of ObjectIds
    const cart = user.Cart 

    // Check if the product is in the cart
    if (!cart.some((id) => id.toString() === productId)) {
      return Response.json(
        { success: false, message: "Product not in cart" },
        { status: 400 }
      );
    }

    // Remove the product from the cart
    user.Cart = cart.filter((id) => id.toString() !== productId);
    await user.save();

    // Return success response
    return Response.json(
      { success: true, message: "Product removed from cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
