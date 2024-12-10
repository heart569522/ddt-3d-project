"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { IRoomSchema, roomSchema } from "@/types/form";
import { IBuilding, IRoom, IRoomTypes } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ComponentType, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Combobox from "../../combobox";
import ButtonLoading from "../../button-loading";
import { Input } from "@/components/shadcn-ui/input";
import { cn } from "@/lib/utils";
import { AlertModal, AlertProps } from "../../alert-modal";
import { Session } from "next-auth";
import { createData, updateData } from "@/actions/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FormLabel from "../../form-label";
import CanvasScreen from "../../canvas-screen/canvas";
import EN12408Floor from "@/components/models/en124/floor-room/en12408-floor";
import { configs } from "@/lib/configs";

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
      roomCode: isFormEdit ? initData?.rm_id : undefined,
      building: isFormEdit ? initData?.bu_id : undefined,
      building_abbr: isFormEdit ? initData?.bu_abbr : undefined,
      roomType: isFormEdit ? initData?.type : undefined,
      roomName: isFormEdit ? (initData?.rm_name as string) : undefined,
      airAmount: isFormEdit ? initData?.air_amount : 0,
      lampAmount: isFormEdit ? initData?.lamp_amount : 0,
      switchAmount: isFormEdit ? initData?.sensor_switch : 0,
      receptacleAmount: isFormEdit ? initData?.sensor_receptacle : 0,
    },
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const roomId = isFormEdit
    ? segments[segments.length - 1]
    : searchParams.get("roomid");

  const [showAlert, setShowAlert] = useState<AlertProps | null>(null);
  const [triggerResetCombobox, setTriggerResetCombobox] =
    useState<boolean>(false);

  const [RoomComponent, setRoomComponent] = useState<ComponentType<{
    isManage: boolean;
    isShowLamp: boolean;
    isShowAir: boolean;
    isFloorColorChange: boolean;
  }> | null>(null);
  const [modelErrorMessage, setModelErrorMessage] = useState<string | null>(
    null
  );
  const cameraPosition = configs.building[
    roomId?.substring(0, 5).toLowerCase() as string
  ]?.floor?.[roomId?.substring(0, 7).toLowerCase() as string]?.room?.[
    roomId?.toLowerCase() as string
  ]?.cameraPosition || [0, 0, 0];

  useEffect(() => {
    const loadRoomComponent = async () => {
      try {
        const component = (
          await import(
            `../../../../components/models/${roomId
              ?.substring(0, 5)
              .toLowerCase()}/floor-room/${roomId
              ?.substring(0, 7)
              .toLowerCase()}-floor`
          )
        ).default;
        setRoomComponent(() => component);
      } catch (error) {
        console.error("Failed to load room component:", error);
        setModelErrorMessage(`Model not avaliable.`);
        setRoomComponent(null);
      }
    };

    loadRoomComponent();
  }, [roomId]);

  const clearAlert = () => {
    setShowAlert(null);
    window.location.href = "/admin/management/rooms";
    // router.push("/admin/management/rooms");
  };

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

    if (data.airAmount < 0 || data.lampAmount < 0) {
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
      building_abbr,
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
          bu_abbr: building_abbr,
          rm_name: roomName,
          rm_type: roomType,
          air_amount: airAmount,
          lamp_amount: lampAmount,
        });
      }
      console.log("🚀 ~ onSubmit ~ response:", response);
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
        <div className="col-span-12 lg:col-span-6 xl:col-span-5">
          <div className="h-[500px] bg-background/50">
            {RoomComponent ? (
              <CanvasScreen
                model={
                  RoomComponent ? (
                    <RoomComponent
                      isManage={true}
                      isShowLamp={true}
                      isShowAir={true}
                      isFloorColorChange={true}
                    />
                  ) : null
                }
                cameraPosition={cameraPosition}
                controlSettings={{
                  minPolarAngle: 0,
                  maxPolarAngle: 0,
                  minDistance: 10,
                  maxDistance: 13,
                  enablePan: false,
                }}
                outlineResolution={0.5}
                outlineStrength={15}
                floorId={roomId?.substring(0, 7)}
                isRoomPage={true}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-lg font-semibold opacity-80">
                  {modelErrorMessage}
                </p>
              </div>
            )}
          </div>
        </div>
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
                    <FormLabel htmlFor="roomCode">รหัสห้อง</FormLabel>
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
                    <FormLabel required htmlFor="Building">
                      อาคาร
                    </FormLabel>
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
                    <FormLabel required htmlFor="building_abbr">
                      ชื่อย่ออาคาร
                    </FormLabel>
                    <Input
                      {...register("building_abbr")}
                      type="text"
                      id="building_abbr"
                      placeholder="ชื่อย่ออาคาร"
                      // disabled
                    />
                    {errors.building_abbr && (
                      <p className="text-sm text-red-500">
                        {errors.building_abbr.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="roomName">
                      ชื่อห้อง
                    </FormLabel>
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
                    <FormLabel required htmlFor="roomType">
                      ประเภทห้อง
                    </FormLabel>
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
                        <FormLabel htmlFor="airAmount" className=" text-nowrap">
                          เครื่องปรับอากาศ
                        </FormLabel>
                        <Input
                          {...register("airAmount", { valueAsNumber: true })}
                          type="number"
                          id="airAmount"
                          placeholder=""
                          className="text-right"
                          min={0}
                        />
                        <FormLabel htmlFor="airAmount">เครื่อง</FormLabel>
                      </div>
                      <div
                        className={cn(
                          "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                        )}
                      >
                        <FormLabel htmlFor="lampAmount" className="text-nowrap">
                          โคมไฟ
                        </FormLabel>
                        <Input
                          {...register("lampAmount", { valueAsNumber: true })}
                          type="number"
                          id="lampAmount"
                          placeholder=""
                          className="text-right"
                          min={0}
                        />
                        <FormLabel htmlFor="lampAmount">ตัว</FormLabel>
                      </div>
                    </div>
                    {/* <div className="flex flex-col flex-wrap sm:flex-row gap-x-8 gap-y-3">
                      <div
                        className={cn(
                          "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                        )}
                      >
                        <FormLabel htmlFor="switchAmount">สวิตซ์</FormLabel>
                        <Input
                          {...register("switchAmount", { valueAsNumber: true })}
                          type="number"
                          id="switchAmount"
                          placeholder=""
                          className="text-right"
                          min={0}
                        />
                        <FormLabel htmlFor="switchAmount">ตัว</FormLabel>
                      </div>
                      <div
                        className={cn(
                          "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                        )}
                      >
                        <FormLabel htmlFor="receptacleAmount">เต้าเสียบ</FormLabel>
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
                        <FormLabel htmlFor="receptacleAmount">ตัว</FormLabel>
                      </div>
                    </div> */}
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
                            <FormLabel className="text-nowrap">
                              เครื่องปรับอากาศ
                            </FormLabel>
                            <Input
                              type="number"
                              placeholder=""
                              value={initData?.sensor_air}
                              className="text-right w-full"
                              disabled
                            />
                            <FormLabel>ตัว</FormLabel>
                          </div>
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <FormLabel className="text-nowrap">
                              กล้องวงจรปิด
                            </FormLabel>
                            <Input
                              type="number"
                              value={initData?.sensor_cctv}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <FormLabel>ตัว</FormLabel>
                          </div>
                        </div>
                        <div className="flex flex-col flex-wrap sm:flex-row gap-x-8 gap-y-3">
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <FormLabel>ความชื้น/ฝุ่น/อุณหภูมิ</FormLabel>
                            <Input
                              type="number"
                              value={initData?.sensor_htpm}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <FormLabel>ตัว</FormLabel>
                          </div>
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <FormLabel>เต้าเสียบ</FormLabel>
                            <Input
                              type="number"
                              value={initData?.sensor_receptacle}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <FormLabel>ตัว</FormLabel>
                          </div>
                        </div>
                        <div className="flex flex-col flex-wrap sm:flex-row gap-x-8 gap-y-3">
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <FormLabel>มิเตอร์</FormLabel>
                            <Input
                              type="number"
                              value={initData?.sensor_meter}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <FormLabel>ตัว</FormLabel>
                          </div>
                          <div
                            className={cn(
                              "flex flex-1 justify-between gap-4 items-center col-span-12 sm:col-span-6"
                            )}
                          >
                            <FormLabel>สวิตซ์</FormLabel>
                            <Input
                              type="number"
                              value={initData?.sensor_switch}
                              placeholder=""
                              className="text-right w-full"
                              disabled
                            />
                            <FormLabel>ตัว</FormLabel>
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
