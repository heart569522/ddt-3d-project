import { getData } from "@/actions/actions";
import { authOptions } from "@/auth";
import AirForm from "@/components/ui/admin/form/air-form";
import { BreadcrumbResponsive } from "@/components/ui/breadcrumb-responsive";
import TitleHeader from "@/components/ui/title-header";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Add Air Conditioner",
};

export default async function AddConditioner() {
  const session = await getServerSession(authOptions);
  const breadcrumbItems = [
    { href: "/admin/management/air-conditioners", label: "จัดการเครื่องปรับอากาศ" },
    { label: `เพิ่มเครื่องปรับอากาศ` },
  ];

  const airBrand = await getData("getAirBrand");
  const airType = await getData("getAirType");

  return (
    <>
      <BreadcrumbResponsive items={breadcrumbItems} />
      <TitleHeader title={`เพิ่มเครื่องปรับอากาศ`} type="static" className="-mt-3 md:-mt-4" />
      <AirForm
        airTypes={airType}
        airBrands={airBrand}
        session={session as Session}
      />
    </>
  );
}
