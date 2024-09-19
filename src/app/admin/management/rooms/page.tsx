import TitleHeader from "@/components/ui/title-header";
import React from "react";
import { getData } from "@/actions/actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Metadata } from "next/types";
import ResponsiveTable from "@/components/ui/admin/table/responsive-table";
import { RoomsColumn } from "@/components/ui/admin/column/rooms-column";
import { IRoom } from "@/types/model";
import { ColumnRoomEnum } from "@/lib/enum";

export const metadata: Metadata = {
  title: "จัดการห้อง",
};

export default async function RoomMangement() {
  const session = await getServerSession(authOptions);
  const data = await getData("getRoom");

  return (
    <> 
      <TitleHeader title="จัดการห้อง" type="static" />
      <div className="w-full mx-auto">
        <ResponsiveTable<IRoom>
          columnHook={RoomsColumn}
          data={data}
          searchColumn={['rm_id', 'bu_name', 'type', 'rm_name']}
          addButtonTitle="เพิ่มห้อง"
          addButtonPath="/admin/management/rooms/add"
          columnEnum={ColumnRoomEnum}
        />
      </div>
    </>
  );
}
