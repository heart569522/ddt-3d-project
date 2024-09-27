import CanvasPanel from "@/components/ui/canvas-screen/canvas-panel";
import TitleHeader from "@/components/ui/title-header";
import React from "react";

export default function Management() {
  return (
    <>
      <TitleHeader title="Engineering CMU" type="static" />
      <CanvasPanel />
    </>
  );
}
