import TitleHeader from "@/components/ui/title-header";
import React from "react";
import { getData } from "@/actions/actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Metadata } from "next/types";
import ResponsiveTable from "@/components/ui/admin/table/responsive-table";
import { IAir } from "@/types/model";
import { AirColumn } from "@/components/ui/admin/column/air-column";
import { ColumnAirEnum } from "@/lib/enum";

export const metadata: Metadata = {
  title: "จัดการเครื่องปรับอากาศ",
};

export default async function AirMangement() {
  const session = await getServerSession(authOptions);
  const data = await getData("getAir");

  return (
    <>
      <TitleHeader title="จัดการเครื่องปรับอากาศ" type="static" />
      <div className="w-full mx-auto">
        <ResponsiveTable<IAir>
          columnHook={AirColumn}
          data={data}
          searchColumn={[
            "rm_id",
            "a_id",
            "brand_code",
            "a_installer",
            "a_code",
          ]}
          addButtonTitle="เพิ่ม"
          addButtonPath="/admin/management/air-conditioners/add"
          columnEnum={ColumnAirEnum}
        />
      </div>
    </>
  );
}
