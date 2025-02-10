import UserModel from "@/database/models/User.Model";
import dbConnect from "@/database/ConnectDB";

export async function POST(req: Request) {
  try {
    await dbConnect(); // Ensure database connection

    const { Location, UserName } = await req.json();
    if (!Location) {
      return Response.json(
        { success: false, message: "Location is required" },
        { status: 400 }
      );
    }

    const users = await UserModel.find({ Location, UserName: { $ne: UserName } });

    return Response.json({
      success: true,
      status: 200,
      users,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Server Error", error: error },
      { status: 500 }
    );
  }
}
