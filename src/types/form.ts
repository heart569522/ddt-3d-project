import { z } from "zod";

export type ILoginSchema = z.infer<typeof loginSchema>;
export const loginSchema = z.object({
  username: z.string({ message: "กรุณากรอกชื่อผู้ใช้" }),
  password: z.string({ message: "กรุณากรอกรหัสผ่าน" }),
});

export type IRoomSchema = z.infer<typeof roomSchema>;
export const roomSchema = z.object({
  roomCode: z.string({ message: "กรุณากรอกรหัสห้อง" }),
  building: z.string({ message: "กรุณาเลือกอาคาร" }),
  roomName: z.string(),
  roomType: z.string({ message: "กรุณาเลือกประเภทห้อง" }),
  airAmount: z.number().min(0),
  lampAmount: z.number().min(0),
  switchAmount: z.number().min(0),
  receptacleAmount: z.number().min(0),
});
