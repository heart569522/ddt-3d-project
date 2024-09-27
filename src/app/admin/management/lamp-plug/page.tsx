import TitleHeader from "@/components/ui/title-header";
import React from "react";
import { getData } from "@/actions/actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Metadata } from "next/types";
import ResponsiveTable from "@/components/ui/admin/table/responsive-table";
import { IAir, ILamp } from "@/types/model";
import { AirColumn } from "@/components/ui/admin/column/air-column";
import { ColumnAirEnum, ColumnLampEnum } from "@/lib/enum";
import { LampColumn } from "@/components/ui/admin/column/lamp-column";

export const metadata: Metadata = {
  title: "จัดการโคม/สวิตซ์ไฟ",
};

export default async function LampPlugMangement() {
  const session = await getServerSession(authOptions);
  const data = await getData("getLamp");

  return (
    <>
      <TitleHeader title="จัดการโคม/สวิตซ์ไฟ" type="static" />
      <div className="w-full mx-auto">
        <ResponsiveTable<ILamp>
          columnHook={LampColumn}
          data={data}
          searchColumn={[
            "rm_id",
            "l_id",
            "brand_code",
            "l_installer",
            "l_code",
          ]}
          addButtonTitle="เพิ่ม"
          addButtonPath="/admin/management/lamp-plug/add"
          columnEnum={ColumnLampEnum}
        />
      </div>
    </>
  );
}
