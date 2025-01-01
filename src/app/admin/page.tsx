import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }
  redirect("/admin/management");
}
