import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/shadcn-ui/card";
import React from "react";

type Props = {
  title: string;
  detail: React.ReactNode;
};

export default function CardInfo({ title, detail }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {detail}
      </CardContent>
    </Card>
  );
}
