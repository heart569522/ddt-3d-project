"use client";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/shadcn-ui/card";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginSchema, loginSchema } from "@/types/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal, AlertProps } from "../../alert-modal";
import { PasswordInput } from "@/components/shadcn-ui/password-input";
import ButtonLoading from "../../button-loading";
import { login } from "@/actions/actions";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [showAlert, setShowAlert] = useState<AlertProps | null>(null);
  const clearAlert = () => setShowAlert(null);
  const router = useRouter();

  const validateFormData = (data: ILoginSchema): boolean => {
    let isValid = true;

    if (!data.username) {
      setError("username", {
        type: "server",
        message: "Please enter your username.",
      });
      isValid = false;
    }

    if (!data.password) {
      setError("password", {
        type: "server",
        message: "Please enter your password.",
      });
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async (data: ILoginSchema) => {
    if (!validateFormData(data)) {
      return;
    }

    try {
      const signInData = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (signInData?.error) {
        // console.log("Error:", signInData.error);
        setShowAlert({
          openModal: true,
          type: "warning",
          detail: "Login failed, please try again.",
          onClose: clearAlert,
        });
      } else {
        router.push("/admin/management");
      }
    } catch (error) {
      setShowAlert({
        openModal: true,
        type: "error",
        detail: "Something wen wrong, please try again later.",
        onClose: clearAlert,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-dvh w-full p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username")}
                id="username"
                type="username"
                placeholder="digitaltwins"
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex w-full flex-col space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link> */}
                </div>
                <PasswordInput
                  {...register("password")}
                  id="password"
                  name="password"
                  placeholder="●●●●●●●●●●●"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <ButtonLoading
              type="submit"
              isLoading={isSubmitting}
              text={"Login"}
              textLoading="Checking..."
              icon={LogIn}
            />
          </CardFooter>
        </Card>
      </form>
      {showAlert && (
        <AlertModal
          openModal={showAlert.openModal}
          type={showAlert.type}
          detail={showAlert.detail}
          onClose={clearAlert}
        />
      )}
    </div>
  );
}
