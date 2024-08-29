import { getData, getDataById } from "@/actions/actions";
import RoomForm from "@/components/ui/admin/form/room-form";
import { BreadcrumbResponsive } from "@/components/ui/breadcrumb-responsive";
import TitleHeader from "@/components/ui/title-header";
import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Add Room",
};

export default async function AddRoom() {
  const breadcrumbItems = [
    { href: "/admin/management/rooms", label: "Rooms" },
    { label: `Add Room` },
  ];

  const buiding = await getData("getBu");
  const roomType = await getData("getRoomType");

  return (
    <>
      <BreadcrumbResponsive items={breadcrumbItems} />
      <TitleHeader title={`Add Room`} type="static" className="-mt-4" />
      <RoomForm roomType={roomType} building={buiding} />
    </>
  );
}
