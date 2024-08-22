import { z } from "zod";

export type ILoginSchema = z.infer<typeof loginSchema>;
export const loginSchema = z.object({
  username: z.string({ message: "Please enter your username." }),
  password: z.string({ message: "Please enter your password." }),
});
