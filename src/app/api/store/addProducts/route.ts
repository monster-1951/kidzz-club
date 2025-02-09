import dbConnect from "@/database/ConnectDB";
import ProductModel from "@/database/models/Product.Model";

export async function POST(request: Request) {
  await dbConnect();
  const { Name, Price, Description, seller, status, ratings, Category } =
    await request.json();
  try {
    const newProduct = await ProductModel.create({
      Name,
      Price,
      Description,
      seller,
      status,
      ratings,
      Category,
    });
    return Response.json(
      {
        success: true,
        message: "Product added Successfully",
        newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Product was not added",
        error,
      },
      { status: 500 }
    );
  }
}
