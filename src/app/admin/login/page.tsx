import LoginForm from "@/components/ui/admin/auth/login-form";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function LogIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("./management");
  }

  return (
    <div className="flex justify-center items-center h-dvh w-full p-2">
      <div className="absolute bg-login-image inset-0 bg-cover bg-center opacity-80 dark:opacity-50" />
      <div className="relative z-10 shadow-xl">
        <LoginForm />
      </div>
    </div>
  );
}
