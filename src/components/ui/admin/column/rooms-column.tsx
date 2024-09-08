"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Trash } from "lucide-react";
import { DataTableColumnHeader } from "../table/column-header";
import { IRoom } from "@/types/model";
import { ColumnNameEnum } from "@/lib/enum";
import Link from "next/link";
import ConfirmModal from "../../confirm-modal";
import { useState } from "react";
import { deleteData } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { AlertModal, AlertProps } from "../../alert-modal";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function useRoomsColumn(): ColumnDef<IRoom>[] {
  const isMediumScreen = useMediaQuery("md");

  return [
    {
      accessorKey: "rm_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={ColumnNameEnum.rm_id} />
      ),
      cell: ({ row }) => <div>{row.getValue("rm_id")}</div>,
      enableSorting: false,
      enableHiding: false,
      size: 20,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={ColumnNameEnum.type} />
      ),
      enableSorting: isMediumScreen,
      size: 20,
    },
    {
      accessorKey: "air_amount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnNameEnum.air_amount}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("air_amount")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      accessorKey: "lamp_amount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnNameEnum.lamp_amount}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("lamp_amount")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      accessorKey: "sensor_switch",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnNameEnum.sensor_switch}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("sensor_switch")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      accessorKey: "sensor_receptacle",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={ColumnNameEnum.sensor_receptacle}
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            {row.getValue("sensor_receptacle")}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 10,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const room = row.original;
        const { data: session } = useSession();
        const router = useRouter();
        const [isConfirmOpen, setIsConfirmOpen] = useState(false);
        const [showAlert, setShowAlert] = useState<AlertProps | null>(null);
        const clearAlert = () => setShowAlert(null);

        const handleCloseConfirm = () => {
          setIsConfirmOpen(false);
        };

        const handleConfirm = async () => {
          setShowAlert((el) => ({
            ...el,
            openModal: true,
            loading: true,
            onClose: clearAlert,
          }));

          try {
            const response = await deleteData(
              "deleteRoom",
              session?.user.accessToken,
              room.rm_id
            );

            if (response?.status === 200) {
              setShowAlert({
                openModal: true,
                loading: false,
                type: "success",
                detail: "ลบข้อมูลห้องสำเร็จ",
                onClose: clearAlert,
              });
              router.refresh();
            }
          } catch {
            setShowAlert({
              openModal: true,
              loading: false,
              type: "error",
              detail: "เกิดข้อผิดพลาด, โปรดลองอีกครั้ง",
              onClose: clearAlert,
            });
          }
        };

        return (
          <div className="flex gap-1 justify-center items-center">
            <Link href={`/admin/management/rooms/${room.rm_id}/edit`}>
              <Button
                className="flex gap-1"
                variant={isMediumScreen ? "ghost" : "outline"}
                size={isMediumScreen ? "icon" : "default"}
              >
                <SquarePen className="size-4" />
                <span className="md:hidden">แก้ไข</span>
              </Button>
            </Link>
            <Button
              variant={isMediumScreen ? "ghost" : "outline"}
              size={isMediumScreen ? "icon" : "default"}
              className="flex gap-1 md:opacity-50 md:hover:opacity-100"
              onClick={() => setIsConfirmOpen(true)}
            >
              <Trash className="size-4" />
              <span className="md:hidden">ลบ</span>
            </Button>

            <ConfirmModal
              title="ยืนยันการลบข้อมูล"
              desc={`คุณยืนยันที่จะลบข้อมูลห้อง: ${room.rm_id} หรือไม่ ?`}
              type="danger"
              open={isConfirmOpen}
              onClose={handleCloseConfirm}
              onSubmit={handleConfirm}
            />

            {showAlert && (
              <AlertModal
                openModal={showAlert.openModal}
                loading={showAlert.loading}
                type={showAlert.type}
                detail={showAlert.detail}
                onClose={showAlert.onClose}
              />
            )}
          </div>
        );
      },
      enableSorting: isMediumScreen,
      size: 20,
    },
  ];
}
