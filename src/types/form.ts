import { z } from "zod";

export type ILoginSchema = z.infer<typeof loginSchema>;
export const loginSchema = z.object({
  username: z.string({ message: "Please enter your username." }),
  password: z.string({ message: "Please enter your password." }),
});

export type IRoomSchema = z.infer<typeof roomSchema>;
export const roomSchema = z.object({
  roomCode: z.string({ message: "Please enter room code." }),
  building: z.string({ message: "Please select building." }),
  roomName: z.string({ message: "Please enter room name." }),
  roomType: z.string({ message: "Please select room type." }),
  airAmount: z.number().min(0, { message: "Please enter air amount." }),
  lampAmount: z.number().min(0, { message: "Please enter lamp amount." }),
  switchAmount: z.number().min(0, { message: "Please enter switch amount." }),
  receptacleAmount: z
    .number()
    .min(0, { message: "Please enter receptacle amount." }),
});
