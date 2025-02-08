
import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/User.Model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect();
  const {
    UserName,
    ParentName,
    Gender,
    ParentGender,
    ParentEmail,
    ParentMobileNumber,
    Password,
    DateOfBirth,
    ParentDateOfBirth,
    ParentPassword
  } = await request.json();
  console.log({
    UserName,
    ParentName,
    Gender,
    ParentGender,
    ParentEmail,
    ParentMobileNumber,
    Password,
    DateOfBirth,
    ParentDateOfBirth,
    ParentPassword
  });

  const hashedPassword = await bcrypt.hash(Password.toString(),12)
  const hashedParentPassword = await bcrypt.hash(ParentPassword.toString(),12)
  const User = {
    UserName,
    ParentName,
    Gender,
    ParentGender,
    ParentEmail,
    ParentMobileNumber,
    Password:hashedPassword,
    DateOfBirth,
    ParentDateOfBirth,
    ParentPassword:hashedParentPassword
  }

  
  console.log(User, "🍻");

  try {
    const userExists = await UserModel.findOne({ UserName:UserName});

    if (userExists) {
      throw new Error("User already exists");
    }

    const newUser = await UserModel.create(User);

    return Response.json(
      {
        success: true,
        message: "User Registered Successfully",
        newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating User", error);
    return Response.json(
      {
        success: false,
        message: "Error in creating the user",
        error,
      },
      { status: 500 }
    );
  }
}
