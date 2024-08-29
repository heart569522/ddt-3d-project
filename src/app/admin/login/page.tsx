import LoginForm from "@/components/ui/admin/auth/login-form";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function LogIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("./management");
  }
  return <LoginForm />;
}
