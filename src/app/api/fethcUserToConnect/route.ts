import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";

export async function POST(req: Request) {
  await dbConnect();
  const { _id } = await req.json();
  try {
    const user = await UserModel.findOne({ _id });
    if (user){
        return Response.json({
            success: true,
            code: 201,
            user: user ? user : "No Users found",
          });
    }
    else {
        return Response.json({
            success: true,
            code: 404,
            user: "User not found",
          });
    }

  } catch (error) {
    return Response.json({
      success: false,
      code: 500,
      error,
    });
  }
}
