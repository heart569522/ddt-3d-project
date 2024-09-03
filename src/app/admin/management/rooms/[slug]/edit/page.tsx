import { getData, getDataById } from "@/actions/actions";
import { authOptions } from "@/auth";
import RoomForm from "@/components/ui/admin/form/room-form";
import { BreadcrumbResponsive } from "@/components/ui/breadcrumb-responsive";
import TitleHeader from "@/components/ui/title-header";
import { getServerSession, Session } from "next-auth";
import { Metadata } from "next/types";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Editing Room: ${params.slug}`,
  };
}

export default async function EditRoom({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  const room = await getDataById("getRoomById", params.slug);

  const breadcrumbItems = [
    { href: "/admin/management/rooms", label: "จัดการห้อง" },
    { label: `แก้ไขห้อง: ${params.slug}` },
  ];
  const buiding = await getData("getBu");
  const roomType = await getData("getRoomType");

  return (
    <>
      <BreadcrumbResponsive items={breadcrumbItems} />
      <TitleHeader
        title={`แก้ไขห้อง: ${params.slug}`}
        type="static"
        className="-mt-4"
      />

      <RoomForm
        roomTypes={roomType}
        building={buiding}
        session={session as Session}
        isFormEdit={true}
        initData={room[0]}
      />
    </>
  );
}
