import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";

export async function POST(req: Request) {
  try {
    const { _id, connectTo } = await req.json();

    if (!_id || !connectTo) {
      return Response.json({ success: false, message: "Missing user IDs" }, { status: 400 });
    }

    await dbConnect();

    // Find both users
    const currentUser = await UserModel.findById(_id);
    const connectWith = await UserModel.findById(connectTo);

    if (!currentUser || !connectWith) {
      return Response.json({ success: false, message: "User(s) not found" }, { status: 404 });
    }

    // Check if they are already connected
    if (
      currentUser.Connections.includes(connectTo) &&
      connectWith.Connections.includes(_id)
    ) {
      return Response.json({ success: false, message: "Users are already connected" }, { status: 400 });
    }

    // Update connections
    await UserModel.updateOne({ _id }, { $addToSet: { Connections: connectTo } });
    await UserModel.updateOne({ _id: connectTo }, { $addToSet: { Connections: _id } });

    return Response.json({
      success: true,
      message: "Users connected successfully",
    });
  } catch (error) {
    console.error("Error updating connections:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
