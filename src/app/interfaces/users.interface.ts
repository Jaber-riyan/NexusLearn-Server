// interfaces/users.interface.ts
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "student" | "faculty";
  failedAttempts: number;
  block: boolean;
  lastLoginTime?: Date;

  studentInfo?: {
    department: string;
    semester: string;
  };

  facultyInfo?: {
    subject: string;
  };

  // guardianInfo?: {
  //   relatedStudentId: string; // optional if needed
  // };
}
