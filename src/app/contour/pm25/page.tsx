import { getData } from "@/actions/actions";
import PM25 from "@/components/ui/contour/pm25";
import Navigation from "@/components/ui/navigation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Realtime PM 2.5 Contour",
};

export default async function PM25Contour() {
  const pm25 = await getData("pm25-contour");
  
  return (
    <Navigation isHideToolbar={true} isHideDashbaord={true}>
      <div className="pt-20 md:pt-24">
        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center">
            Realtime PM 2.5 Contour
          </h1>
          <h3 className="text-base md:text-xl lg:text-2xl text-center">
            (5 Minutes Update)
          </h3>
        </div>
        <div className="px-3 py-6 sm:px-6 sm:py-10 md:px-10">
          <PM25 data={pm25} />
        </div>
      </div>
    </Navigation>
  );
}
