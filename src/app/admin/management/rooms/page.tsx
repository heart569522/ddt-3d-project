import { DataTable } from "@/components/ui/admin/table/data-table";
import TitleHeader from "@/components/ui/title-header";
import React from "react";
import { getData } from "@/actions/actions";
import { roomsColumn } from "@/components/ui/admin/column/rooms-column";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Rooms Management",
};

export default async function RoomMangement() {
  const session = await getServerSession(authOptions);
  const data = await getData("getRoom");

  return (
    <>
      <TitleHeader title="จัดการห้อง" type="static" />
      <div className="w-full mx-auto">
        <DataTable
          columns={roomsColumn}
          data={data}
          searchColumn="rm_id"
          addButtonTitle="เพิ่มห้อง"
          addButtonPath="/admin/management/rooms/add"
        />
      </div>
    </>
  );
}
