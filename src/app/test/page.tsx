"use client";

import { register } from "@/actions/actions";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await register(formData);

      if (result) {
        setResponseMessage("Register successfully.");
      } else {
        setResponseMessage("Failed to register.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Failed to register.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-2">
      <form onSubmit={handleSubmit} className="space-y-1 w-full sm:max-w-64">
        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>
      {responseMessage && (
        <div className="mt-4 text-center">
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
}
