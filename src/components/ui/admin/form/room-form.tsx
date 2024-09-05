"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Label } from "@/components/shadcn-ui/label";
import { IRoomSchema, roomSchema } from "@/types/form";
import { IBuilding, IRoom, IRoomTypes } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Combobox from "../../combobox";
import ButtonLoading from "../../button-loading";
import { Input } from "@/components/shadcn-ui/input";
import { cn } from "@/lib/utils";
import { AlertModal, AlertProps } from "../../alert-modal";
import { Session } from "next-auth";
import { createData, updateData } from "@/actions/actions";
import { useRouter } from "next/navigation";

interface Props {
  roomTypes: IRoomTypes[];
  building: IBuilding;
  session: Session;
  isFormEdit?: boolean;
  initData?: IRoom;
}

export default function RoomForm({
  roomTypes,
  building,
  session,
  isFormEdit = false,
  initData,
}: Props) {
  console.log("🚀 ~ roomType:", roomTypes);
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<IRoomSchema>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      roomCode: isFormEdit ? initData?.rm_id : "",
      building: isFormEdit ? initData?.bu_id : "",
      roomType: isFormEdit ? initData?.type : "",
      roomName: isFormEdit ? (initData?.rm_name as string) : "",
      airAmount: isFormEdit ? initData?.air_amount : 0,
      lampAmount: isFormEdit ? initData?.lamp_amount : 0,
      switchAmount: isFormEdit ? initData?.sensor_switch : 0,
      receptacleAmount: isFormEdit ? initData?.sensor_receptacle : 0,
    },
  });

  const [showAlert, setShowAlert] = useState<AlertProps | null>(null);
  const clearAlert = () => setShowAlert(null);
  const router = useRouter();
  const [triggerResetCombobox, setTriggerResetCombobox] =
    useState<boolean>(false);

  const validateFormData = (data: IRoomSchema): boolean => {
    let isValid = true;

    if (!data.roomCode) {
      setError("roomCode", {
        type: "server",
        message: "กรุณากรอกรหัสห้อง",
      });
      isValid = false;
    }

    if (!data.building) {
      setError("building", {
        type: "server",
        message: "กรุณาเลือกอาคาร",
      });
      isValid = false;
    }

    if (!data.roomType) {
      setError("roomType", {
        type: "server",
        message: "กรุณาเลือกประเภทห้อง",
      });
      isValid = false;
    }

    if (
      data.airAmount < 0 ||
      data.lampAmount < 0 ||
      data.switchAmount < 0 ||
      data.receptacleAmount < 0
    ) {
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async (data: IRoomSchema) => {
    if (!validateFormData(data)) {
      return;
    }

    setShowAlert((el) => ({
      ...el,
      openModal: true,
      loading: true,
      onClose: clearAlert,
    }));

    const {
      roomCode,
      roomName,
      roomType,
      building,
      airAmount,
      lampAmount,
      switchAmount,
      receptacleAmount,
    } = data;

    try {
      let response;
      const selectedRoomType = roomTypes.find((item) => item.type === roomType);

      if (isFormEdit) {
        response = await updateData(
          "updateRoom",
          session.user.accessToken,
          {
            rm_name: roomName,
            rm_type: selectedRoomType?.rm_type,
            air_amount: airAmount,
            lamp_amount: lampAmount,
          },
          roomCode
        );
      } else {
        response = await createData("addRoom", session.user.accessToken, {
          rm_id: roomCode,
          bu_id: building,
          rm_name: roomName,
          rm_type: roomType,
          air_amount: airAmount,
          lamp_amount: lampAmount,
          switch_amount: switchAmount,
          receptacle_amount: receptacleAmount,
        });
      }
      if (response && response.status === 200) {
        setShowAlert({
          openModal: true,
          loading: false,
          type: "success",
          detail: isFormEdit
            ? `Update room: ${initData?.rm_id} success`
            : "Create new room success",
          onClose: clearAlert,
        });
        setTriggerResetCombobox(true);
        reset();
        if (isFormEdit) {
          setTimeout(() => {
            router.push("/admin/management/rooms");
          }, 2000);
        }
      } else {
        setShowAlert({
          openModal: true,
          loading: false,
          type: "warning",
          detail: isFormEdit
            ? `Update faild, please try again.`
            : "Create new room faild, please try again.",
          onClose: clearAlert,
        });
      }
    } catch (error) {
      // console.error("🚀 ~ onSubmit ~ error:", error);
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
    <div className="flex flex-1 items-start justify-start">
      <div className="grid gap-4 grid-cols-12 w-full relative">
        <div className="col-span-12 lg:col-span-6 xl:col-span-5"></div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  {isFormEdit ? "แก้ไขข้อมูลห้อง" : "เพิ่มห้อง"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="roomCode">รหัสห้อง</Label>
                    <Input
                      {...register("roomCode")}
                      type="text"
                      id="roomCode"
                      placeholder="กรอกรหัสห้อง"
                      disabled={isFormEdit}
                    />
                    {errors.roomCode && (
                      <p className="text-sm text-red-500">
                        {errors.roomCode.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="Building">อาคาร</Label>
                    <Combobox
                      title="อาคาร"
                      listData={building}
                      defaultValue={getValues("building")}
                      valueKey="bu_id"
                      nameKey="bu_name"
                      showValueWithName={true}
                      showResetButton={true}
                      triggerReset={triggerResetCombobox}
                      onValueChange={(selectedValue) => {
                        setValue("building", selectedValue);
                      }}
                      disabled={isFormEdit}
                    />
                    {errors.building && (
                      <p className="text-sm text-red-500">
                        {errors.building.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="roomName">ชื่อห้อง</Label>
                    <Input
                      {...register("roomName")}
                      type="text"
                      id="roomName"
                      placeholder="กรอกชื่อห้อง"
                    />
                    {errors.roomName && (
                      <p className="text-sm text-red-500">
                        {errors.roomName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="roomType">ประเภทห้อง</Label>
                    <Combobox
                      title="ประเภทห้อง"
                      listData={roomTypes}
                      defaultValue={getValues("roomType")}
                      valueKey="rm_type"
                      nameKey="type"
                      showValueWithName={false}
                      showResetButton={true}
                      triggerReset={triggerResetCombobox}
                      onValueChange={(selectedValue) => {
                        setValue("roomType", selectedValue);
                      }}
                    />
                    {errors.roomType && (
                      <p className="text-sm text-red-500">
                        {errors.roomType.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-start items-center gap-4 w-full">
                    <span className=" text-nowrap text-lg md:text-xl font-semibold leading-none tracking-tight">
                      จำนวนอุปกรณ์
                    </span>
                    <hr className="h-0.5 w-full bg-primary/10 rounded-md" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col flex-wrap sm:flex-row gap-x-8 gap-y-3">
                      <div
                        className={cn(
                          "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                        )}
                      >
                        <Label htmlFor="airAmount">แอร์</Label>
                        <Input
                          {...register("airAmount", { valueAsNumber: true })}
                          type="number"
                          id="airAmount"
                          placeholder=""
                          className="text-right"
                          min={0}
                        />
                        <Label htmlFor="airAmount">เครื่อง</Label>
                      </div>
                      <div
                        className={cn(
                          "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                        )}
                      >
                        <Label htmlFor="lampAmount" className=" text-nowrap">
                          โคมไฟ
                        </Label>
                        <Input
                          {...register("lampAmount", { valueAsNumber: true })}
                          type="number"
                          id="lampAmount"
                          placeholder=""
                          className="text-right"
                          min={0}
                        />
                        <Label htmlFor="lampAmount">โคม</Label>
                      </div>
                    </div>
                    <div className="flex flex-col flex-wrap sm:flex-row gap-x-8 gap-y-3">
                      <div
                        className={cn(
                          "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                        )}
                      >
                        <Label htmlFor="switchAmount">สวิตซ์</Label>
                        <Input
                          {...register("switchAmount", { valueAsNumber: true })}
                          type="number"
                          id="switchAmount"
                          placeholder=""
                          className="text-right"
                          min={0}
                        />
                        <Label htmlFor="switchAmount">ตัว</Label>
                      </div>
                      <div
                        className={cn(
                          "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                        )}
                      >
                        <Label htmlFor="receptacleAmount">เต้าเสียบ</Label>
                        <Input
                          {...register("receptacleAmount", {
                            valueAsNumber: true,
                          })}
                          type="number"
                          id="receptacleAmount"
                          placeholder=""
                          className="text-right"
                          min={0}
                        />
                        <Label htmlFor="receptacleAmount">ตัว</Label>
                      </div>
                    </div>
                  </div>

                  {isFormEdit && (
                    <>
                      <div className="flex justify-start items-center gap-4 w-full">
                        <span className=" text-nowrap text-lg md:text-xl font-semibold leading-none tracking-tight">
                          จำนวน Sensor
                        </span>
                        <hr className="h-0.5 w-full bg-primary/10 rounded-md" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex flex-col flex-wrap sm:flex-row gap-x-8 gap-y-3">
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <Label>Air</Label>
                            <Input
                              type="number"
                              placeholder=""
                              value={initData?.sensor_air}
                              className="text-right w-full"
                              disabled
                            />
                            <Label>ตัว</Label>
                          </div>
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <Label>CCTV</Label>
                            <Input
                              type="number"
                              value={initData?.sensor_cctv}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <Label>ตัว</Label>
                          </div>
                        </div>
                        <div className="flex flex-col flex-wrap sm:flex-row gap-x-8 gap-y-3">
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <Label>HTPM</Label>
                            <Input
                              type="number"
                              value={initData?.sensor_htpm}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <Label>ตัว</Label>
                          </div>
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <Label>Receptacle</Label>
                            <Input
                              type="number"
                              value={initData?.sensor_receptacle}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <Label>ตัว</Label>
                          </div>
                        </div>
                        <div className="flex flex-col flex-wrap sm:flex-row gap-x-8 gap-y-3">
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <Label>Meter</Label>
                            <Input
                              type="number"
                              value={initData?.sensor_meter}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <Label>ตัว</Label>
                          </div>
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <Label>Switch</Label>
                            <Input
                              type="number"
                              value={initData?.sensor_switch}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <Label>ตัว</Label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="gap-2 justify-center">
                <ButtonLoading
                  type="submit"
                  text="ตกลง"
                  textLoading="ตรวจสอบ..."
                  isLoading={isSubmitting}
                />
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
      {showAlert && (
        <AlertModal
          openModal={showAlert.openModal}
          loading={showAlert.loading}
          type={showAlert.type}
          detail={showAlert.detail}
          onClose={clearAlert}
        />
      )}
    </div>
  );
}
