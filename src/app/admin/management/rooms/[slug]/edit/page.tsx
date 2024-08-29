import { getDataById } from "@/actions/actions";
import { BreadcrumbResponsive } from "@/components/ui/breadcrumb-responsive";
import TitleHeader from "@/components/ui/title-header";
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
  const room = await getDataById("getRoomById", params.slug);
  const breadcrumbItems = [
    { href: "/admin/management/rooms", label: "Rooms" },
    { label: `Edit Room: ${params.slug}` },
  ];

  return (
    <>
      <BreadcrumbResponsive items={breadcrumbItems} />
      <TitleHeader
        title={`Edit Room: ${params.slug}`}
        type="static"
        className="-mt-4"
      />

      {JSON.stringify(room)}
    </>
  );
}
