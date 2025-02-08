import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    UserName: string;
    ParentName: string;
    Points:number;
    Gender: "Male" | "Female";
    ParentEmail: string;
    ParentMobileNumber?: number;
    DateOfBirth: string;
    ParentDateOfBirth?: string;
  }
  interface Session {
    user: {
        _id: string;
        UserName: string;
        ParentName: string;
        Gender: "Male" | "Female";
        ParentEmail: string;
        ParentMobileNumber?: number;
        DateOfBirth: string;
        ParentDateOfBirth?: string;
    } & DefaultSession["user"];
  }
}
