import { getData } from "@/actions/actions";
import { authOptions } from "@/auth";
import LampForm from "@/components/ui/admin/form/lamp-form";
import { BreadcrumbResponsive } from "@/components/ui/breadcrumb-responsive";
import TitleHeader from "@/components/ui/title-header";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "เพิ่มโคมไฟ",
};

export default async function AddLamp() {
  const session = await getServerSession(authOptions);
  const breadcrumbItems = [
    { href: "/admin/management/lamp-plug", label: "จัดการโคม/สวิตซ์ไฟ" },
    { label: `เพิ่มโคมไฟ` },
  ];

  const lampBrand = await getData("getLampBrand");
  const bulbBrand = await getData("getBulbBrand");
  const lampType = await getData("getLampType");
  const bulbType = await getData("getBulbType");

  return (
    <>
      <BreadcrumbResponsive items={breadcrumbItems} />
      <TitleHeader
        title={`เพิ่มโคมไฟ`}
        type="static"
        className="-mt-3 md:-mt-4"
      />
      <LampForm
        lampTypes={lampType}
        bulbTypes={bulbType}
        bulbBrands={bulbBrand}
        lampBrands={lampBrand}
        session={session as Session}
      />
    </>
  );
}
