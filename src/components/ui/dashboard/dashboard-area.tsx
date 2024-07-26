import React from "react";

type Props = {
  dashboard: React.ReactNode;
};

export default function DashboardArea({ dashboard }: Props) {
  return <>{dashboard}</>;
}
