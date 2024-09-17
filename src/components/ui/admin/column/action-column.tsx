"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AlertModal, AlertProps } from "../../alert-modal";
import { deleteData } from "@/actions/actions";
import Link from "next/link";
import { Button } from "@/components/shadcn-ui/button";
import { SquarePen, Trash } from "lucide-react";
import ConfirmModal from "../../confirm-modal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Props {
  dataId: string | number;
}

export default function ActionColumn({ dataId }: Props) {
  const { data: session } = useSession();
  const isMediumScreen = useMediaQuery("md");
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
        dataId
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
      <Link href={`/admin/management/rooms/${dataId}/edit`}>
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
        desc={`คุณยืนยันที่จะลบข้อมูลห้อง: ${dataId} หรือไม่ ?`}
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
}
