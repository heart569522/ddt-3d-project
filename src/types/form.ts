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

export type IAirSchema = z.infer<typeof airSchema>;
export const airSchema = z.object({
  roomCode: z.string({ message: "กรุณากรอกรหัสห้อง" }),
  airId: z.string({ message: "กรุณากรอกรหัสแอร์" }),
  sensorId: z.string({ message: "กรุณาเลือกเซ็นเซอร์" }),
  air: z.string({ message: "กรุณาเลือกแอร์" }),
  airType: z.string(),
  airBTU: z.number(),
  airInvater: z.number(),
  airBrand: z.string({ message: "กรุณาเลือกยี่ห้อแอร์" }),
  airModel: z.string(),
  orderId: z.string(),
  buyer: z.string(),
  orderDate: z.date().optional(),
  receivedDate: z.date().optional(),
  warrantyPeriod: z.date().optional(),
  installDate: z.date().optional(),
  installer: z.string(),
});

export type ILampSchema = z.infer<typeof lampSchema>;
export const lampSchema = z.object({
  roomCode: z.string({ message: "กรุณากรอกรหัสห้อง" }),
  lampId: z.string({ message: "กรุณากรอกรหัสโคมไฟ" }),
  sensorId: z.string({ message: "กรุณาเลือกเซ็นเซอร์" }),
  lamp: z.string({ message: "กรุณาเลือกโคม" }),
  lampType: z.string(),
  lampShape: z.string(),
  lampBulbSocket: z.string(),
  lampBulbAmount: z.number(),
  lampBrand: z.string({ message: "กรุณาเลือกยี่ห้อโคมไฟ" }),
  bulb: z.string({ message: "กรุณาเลือกหลอดของโคมไฟ" }),
  bulbType: z.string(),
  bulbShape: z.string(),
  bulbWatt: z.string(),
  bulbLength: z.number(),
  bulbColor: z.string(),
  bulbBrand: z.string({ message: "กรุณาเลือกยี่ห้อหลอดของโคมไฟ" }),
  installDate: z.date().optional(),
  installer: z.string(),
});
