import { getData, getDataById } from "@/actions/actions";
import { authOptions } from "@/auth";
import LampForm from "@/components/ui/admin/form/lamp-form";
import { BreadcrumbResponsive } from "@/components/ui/breadcrumb-responsive";
import TitleHeader from "@/components/ui/title-header";
import { getServerSession, Session } from "next-auth";
import { Metadata } from "next/types";
import React, { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const lampId = params.slug[1];
  return {
    title: `แก้ไขข้อมูลโคมไฟ: ${lampId}`,
  };
}

export default async function EditLamp({
  params,
}: {
  params: { slug: string[] };
}) {
  const roomId = params.slug[0];
  const lampId = params.slug[1];
  const session = await getServerSession(authOptions);
  const lamp = await getDataById("getLampInById", lampId);

  const breadcrumbItems = [
    {
      href: "/admin/management/lamp-plug",
      label: "จัดการโคม/สวิตซ์ไฟ",
    },
    { label: `แก้ไขข้อมูลโคมไฟ: ${lampId}` },
  ];
  const lampBrand = await getData("getLampBrand");
  const bulbBrand = await getData("getBulbBrand");
  const lampType = await getData("getLampType");
  const bulbType = await getData("getBulbType");
  const switchSensor = await getData(`getSensorSwitch/${roomId}`);

  return (
    <>
      <BreadcrumbResponsive items={breadcrumbItems} />
      <TitleHeader
        title={`แก้ไขข้อมูลโคมไฟ: ${lampId}`}
        type="static"
        className="-mt-4"
      />
      <LampForm
        lampTypes={lampType}
        bulbTypes={bulbType}
        bulbBrands={bulbBrand}
        lampBrands={lampBrand}
        sensorSwitch={switchSensor}
        session={session as Session}
        isFormEdit={true}
        initData={lamp[0]}
      />
    </>
  );
}
