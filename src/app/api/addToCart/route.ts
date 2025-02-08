import UserModel from "@/database/models/User.Model";
import ProductModel from "@/database/models/Product.Model"; // Adjust the path if needed
import dbConnect from "@/database/ConnectDB";

export async function POST(request: Request) {
  const { productId, UserName } = await request.json();
  await dbConnect(); // Connect to the database

  try {
    // Fetch the user by UserName
    const user = await UserModel.findOne({ UserName });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Fetch the product to ensure it exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    // Check if the product is already in the cart
    if (user.Cart.includes(productId)) {
      return Response.json(
        {
          success: false,
          message: "Product is already in the cart",
        },
        { status: 400 }
      );
    }

    // Add the product to the user's cart
    user.Cart.push(productId);
    await user.save();

    // Return success response
    return Response.json(
      {
        success: true,
        message: "Product added to cart successfully",
        productId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return Response.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
