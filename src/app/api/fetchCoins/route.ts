import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";

export async function POST(req: Request) {
  await dbConnect();
  const { _id } = await req.json();
  try {
    const user = await UserModel.findById(_id);
    return Response.json({
      success: true,
      status: 200,
      Coins: user?.Points,
    });
  } catch (error) {
    return Response.json({
      success: false,
      status: 401,
      error,
      _id,
    });
  }
}
