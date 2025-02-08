import dbConnect from "@/database/ConnectDB";
import ProductModel from "@/database/models/Product.Model";

export async function GET() {
    await dbConnect();
    try {
      // Fetch all products from the database
      const products = await ProductModel.find({});
  
      // Group products by category
      const categorizedProducts: Record<string, any[]> = {};
      products.forEach((product) => {
        const category = product.Category;
        if (!categorizedProducts[category]) {
          categorizedProducts[category] = [];
        }
        categorizedProducts[category].push(product);
      });
  
      return Response.json({
        success: true,
        message: "GET Request success",
        products: categorizedProducts,
      });
    } catch (error) {
      return Response.json({
        success: false,
        message: "GET Request Failed",
        error,
      });
    }
  }
  