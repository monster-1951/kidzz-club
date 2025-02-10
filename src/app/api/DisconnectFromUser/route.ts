import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";

export async function POST(req: Request) {
  try {
    const { _id, disconnectFrom } = await req.json();

    if (!_id || !disconnectFrom) {
      return Response.json({ success: false, message: "Missing user IDs" }, { status: 400 });
    }

    await dbConnect();

    // Find both users
    const currentUser = await UserModel.findById(_id);
    const disconnectWith = await UserModel.findById(disconnectFrom);

    if (!currentUser || !disconnectWith) {
      return Response.json({ success: false, message: "User(s) not found" }, { status: 404 });
    }

    // Check if they are not already disconnected
    if (
      !currentUser.Connections.includes(disconnectFrom) ||
      !disconnectWith.Connections.includes(_id)
    ) {
      return Response.json({ success: false, message: "Users are not connected" }, { status: 400 });
    }

    // Remove the connection from both users
    await UserModel.updateOne({ _id }, { $pull: { Connections: disconnectFrom } });
    await UserModel.updateOne({ _id: disconnectFrom }, { $pull: { Connections: _id } });

    return Response.json({
      success: true,
      message: "Users disconnected successfully",
    });
  } catch (error) {
    console.error("Error disconnecting users:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
