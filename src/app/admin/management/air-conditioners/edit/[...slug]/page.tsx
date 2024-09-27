import { getData, getDataById } from "@/actions/actions";
import { authOptions } from "@/auth";
import AirForm from "@/components/ui/admin/form/air-form";
import { BreadcrumbResponsive } from "@/components/ui/breadcrumb-responsive";
import TitleHeader from "@/components/ui/title-header";
import { getServerSession, Session } from "next-auth";
import { Metadata } from "next/types";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const airId = params.slug[1];
  return {
    title: `แก้ไขข้อมูลแอร์: ${airId}`,
  };
}

export default async function EditAir({ params }: { params: { slug: string[] } }) {
  const roomId = params.slug[0];
  const airId = params.slug[1];
  const session = await getServerSession(authOptions);
  const air = await getDataById("getAirById", airId);

  const breadcrumbItems = [
    {
      href: "/admin/management/air-conditioners",
      label: "จัดการเครื่องปรับอากาศ",
    },
    { label: `แก้ไขข้อมูลแอร์: ${airId}` },
  ];
  const airBrand = await getData("getAirBrand");
  const airType = await getData("getAirType");
  const airSensor = await getData(`getSensorAir/${roomId}`);

  return (
    <>
      <BreadcrumbResponsive items={breadcrumbItems} />
      <TitleHeader
        title={`แก้ไขข้อมูลแอร์: ${airId}`}
        type="static"
        className="-mt-4"
      />
      <AirForm
        airTypes={airType}
        airBrands={airBrand}
        sensorAir={airSensor}
        session={session as Session}
        isFormEdit={true}
        initData={air[0]}
      />
    </>
  );
}
