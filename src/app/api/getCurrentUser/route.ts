import { NextRequest } from "next/server";
import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json(); // ✅ Extract id from request body
    console.log(id, "🤖🤖🤖🤖");

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await dbConnect();
    const user = await UserModel.findById(id);

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in finding the user", error);
    return new Response(JSON.stringify({ success: false, error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
