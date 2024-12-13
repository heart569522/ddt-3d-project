# ใช้ Node.js เวอร์ชัน 20 เป็น base image
FROM node:20 AS builder

# ตั้งค่า working directory
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies และสร้าง production build
RUN npm install
COPY . .
RUN npm run build

# ใช้ base image Node.js เวอร์ชัน 20 สำหรับ production
FROM node:20

# ตั้งค่า working directory ใน production container
WORKDIR /usr/src/app

# คัดลอกไฟล์ build และ dependencies จาก builder stage
COPY --from=builder /usr/src/app ./

# เปิดพอร์ต 3000
EXPOSE 3000

# คำสั่งเริ่มต้นเมื่อ container รัน
CMD ["npm", "run", "start"]
