import { getData, getDataById } from "@/actions/actions";
import { authOptions } from "@/auth";
import RoomForm from "@/components/ui/admin/form/room-form";
import { BreadcrumbResponsive } from "@/components/ui/breadcrumb-responsive";
import TitleHeader from "@/components/ui/title-header";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Add Room",
};

export default async function AddRoom() {
  const session = await getServerSession(authOptions);
  const breadcrumbItems = [
    { href: "/admin/management/rooms", label: "จัดการห้อง" },
    { label: `เพิ่มห้อง` },
  ];

  const buiding = await getData("getBu");
  const roomType = await getData("getRoomType");

  return (
    <>
      <BreadcrumbResponsive items={breadcrumbItems} />
      <TitleHeader title={`เพิ่มห้อง`} type="static" className="-mt-4" />
      <RoomForm
        roomTypes={roomType}
        building={buiding}
        session={session as Session}
      />
    </>
  );
}
