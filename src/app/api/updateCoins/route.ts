import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect(); // Ensure database connection

  try {
    const { Points, _id, action } = await req.json();

    if (!_id || !Points || !action) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await UserModel.findById(_id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Update Points based on action
    if (action === "add") {
      user.Points += Points;
    } else if (action === "remove" && typeof user.Points !== "undefined") {
      user.Points = Math.max(0, user.Points - Points); // Prevent negative points
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action" },
        { status: 400 }
      );
    }

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Points updated successfully",
        Points: user.Points,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating points:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
