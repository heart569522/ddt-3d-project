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
  building_abbr: z.string().optional(),
  roomName: z.string({ message: "กรุณากรอกชื่อห้อง" }),
  roomType: z.string({ message: "กรุณาเลือกประเภทห้อง" }),
  airAmount: z.number().min(0),
  lampAmount: z.number().min(0),
  switchAmount: z.number().min(0),
  receptacleAmount: z.number().min(0),
});

export type IAirSchema = z.infer<typeof airSchema>;
export const airSchema = z
  .object({
    roomCode: z.string({ message: "กรุณากรอกรหัสห้อง" }),
    airId: z.string({ message: "กรุณากรอกรหัสแอร์" }),
    sensorId: z.string({ message: "กรุณาเลือกเซ็นเซอร์" }),
    air: z.string({ message: "กรุณาเลือกแอร์" }),
    airType: z.string(),
    airBTU: z.number(),
    airInvater: z.number(),
    airBrand: z.string({ message: "กรุณาเลือกยี่ห้อแอร์" }),
    airModel: z.string({ message: "กรุณาเลือกรุ่นของแอร์" }),
    orderId: z.string({ message: "กรุณากรอกรหัสสั่งซื้อ" }),
    buyer: z.string({ message: "กรุณากรอกผู้สั่งซื้อ" }),
    orderDate: z.date({ message: "กรุณาเลือกวันที่ซื้อ" }).optional(),
    receivedDate: z.date({ message: "กรุณาเลือกวันที่รับเข้า" }).optional(),
    warrantyPeriod: z.date({ message: "กรุณาเลือกวันที่หมดประกัน" }).optional(),
    installDate: z.date({ message: "กรุณาเลือกวันที่ติดตั้ง" }).optional(),
    installer: z.string({ message: "กรุณากรอกชื่อผู้ติดตั้ง" }),
  }) // วันที่ติดตั้งต้องไม่ก่อนวันที่สั่งซื้อ
  .refine(
    (data) =>
      !data.installDate ||
      !data.orderDate ||
      data.installDate >= data.orderDate,
    {
      path: ["installDate"],
      message: "วันที่ติดตั้งต้องไม่ก่อนวันที่สั่งซื้อ",
    }
  )
  // วันที่หมดประกันต้องมากกว่าวันที่ติดตั้ง, วันที่รับเข้า และวันที่สั่งซื้อ
  .refine(
    (data) =>
      !data.warrantyPeriod ||
      ((!data.installDate || data.warrantyPeriod >= data.installDate) &&
        (!data.receivedDate || data.warrantyPeriod >= data.receivedDate) &&
        (!data.orderDate || data.warrantyPeriod >= data.orderDate)),
    {
      path: ["warrantyPeriod"],
      message:
        "วันที่หมดประกันต้องมากกว่าวันที่ติดตั้ง, วันที่รับเข้า และวันที่สั่งซื้อ",
    }
  )
  // วันที่รับเข้าต้องอยู่ระหว่างวันที่สั่งซื้อและวันที่หมดประกัน
  .refine(
    (data) =>
      !data.receivedDate ||
      ((!data.warrantyPeriod || data.receivedDate <= data.warrantyPeriod) &&
        (!data.orderDate || data.receivedDate >= data.orderDate)),
    {
      path: ["receivedDate"],
      message: "วันที่รับเข้าต้องอยู่ระหว่างวันที่สั่งซื้อและวันที่หมดประกัน",
    }
  )
  // วันที่สั่งซื้อต้องไม่มากกว่าวันที่รับเข้า, วันที่ติดตั้ง, หรือวันที่หมดประกัน
  .refine(
    (data) =>
      !data.orderDate ||
      ((!data.receivedDate || data.orderDate <= data.receivedDate) &&
        (!data.installDate || data.orderDate <= data.installDate) &&
        (!data.warrantyPeriod || data.orderDate <= data.warrantyPeriod)),
    {
      path: ["orderDate"],
      message:
        "วันที่สั่งซื้อต้องไม่มากกว่าวันที่รับเข้า, วันที่ติดตั้ง, หรือวันที่หมดประกัน",
    }
  );

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
  bulbLength: z.string(),
  bulbColor: z.string(),
  bulbBrand: z.string({ message: "กรุณาเลือกยี่ห้อหลอดของโคมไฟ" }),
  installDate: z.date({ message: "กรุณาเลือกวันที่ติดตั้ง" }).optional(),
  installer: z.string({ message: "กรุณากรอกชื่อผู้ติดตั้ง" }),
});
