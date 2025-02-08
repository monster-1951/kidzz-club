import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  await dbConnect();
  const { username, password } = await request.json();
  const User = await UserModel.findOne({ UserName: username });
  const isPasswordCorrect = await bcrypt.compare(
    password,
    User?.ParentPassword || ""
  );
  return Response.json(
    {
      success: true,
      message: "This was your password",
      password,
      username,
      isPasswordCorrect
    },
    { status: 201 }
  );
}
