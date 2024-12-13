"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { airSchema, IAirSchema, IRoomSchema, roomSchema } from "@/types/form";
import {
  IAir,
  IAirBrands,
  IAirTypes,
  IBuilding,
  IRoom,
  IRoomTypes,
  ISensorAir,
  ISensorAirTypes,
} from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ComponentType, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Combobox from "../../combobox";
import ButtonLoading from "../../button-loading";
import { Input } from "@/components/shadcn-ui/input";
import { cn } from "@/lib/utils";
import { AlertModal, AlertProps } from "../../alert-modal";
import { Session } from "next-auth";
import { createData, getData, updateData } from "@/actions/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { th } from "date-fns/locale";
import { formatDatetoISOStringWithoutTime } from "@/lib/formats";
import FormLabel from "../../form-label";
import CanvasScreen from "../../canvas-screen/canvas";
import { configs } from "@/lib/configs";

interface Props {
  airTypes: IAirTypes[];
  airBrands: IAirBrands;
  sensorAir?: ISensorAir;
  session: Session;
  isFormEdit?: boolean;
  initData?: IAir;
}

export default function AirForm({
  airTypes,
  airBrands,
  sensorAir,
  session,
  isFormEdit = false,
  initData,
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const roomId = isFormEdit
    ? segments[segments.length - 2]
    : searchParams.get("roomid")?.substring(0, 9);
  const airId = isFormEdit
    ? segments[segments.length - 1]
    : searchParams.get("roomid");

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<IAirSchema>({
    resolver: zodResolver(airSchema),
    defaultValues: {
      roomCode: isFormEdit ? initData?.rm_id : roomId,
      airId: isFormEdit ? initData?.a_id : airId?.replace("-", ""),
      sensorId: isFormEdit ? initData?.u_srID : undefined,
      air: isFormEdit ? initData?.a_code : undefined,
      airBrand: isFormEdit ? initData?.brand_code : undefined,
      airModel: isFormEdit ? initData?.gen : undefined,
      orderId: isFormEdit ? initData?.order_id : undefined,
      buyer: isFormEdit ? initData?.buyer : undefined,
      orderDate:
        isFormEdit && initData?.order_date
          ? new Date(initData.order_date)
          : undefined,
      receivedDate:
        isFormEdit && initData?.order_date
          ? new Date(initData?.received_date)
          : undefined,
      warrantyPeriod:
        isFormEdit && initData?.order_date
          ? new Date(initData?.warranty_period)
          : undefined,
      installDate:
        isFormEdit && initData?.order_date
          ? new Date(initData?.a_install_date)
          : undefined,
      installer: isFormEdit ? initData?.a_installer : undefined,
    },
  });

  const [sensorAirList, setSensorAirList] = useState<ISensorAir | undefined>(
    sensorAir
  );
  const [RoomComponent, setRoomComponent] = useState<ComponentType<{
    isManage: boolean;
    isShowLamp: boolean;
    isShowAir: boolean;
    isFloorColorChange: boolean;
    activeAirId: string | null;
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

  useEffect(() => {
    if (!isFormEdit) {
      const loadAirSensor = async () => {
        try {
          const data = await getData(`getSensorAir/${roomId}`, true);
          setSensorAirList(data);
        } catch (error) {
          console.error("Failed to load sensor air data:", error);
        }
      };

      loadAirSensor();
    }
  }, [roomId, isFormEdit]);

  const [showAlert, setShowAlert] = useState<AlertProps | null>(null);
  const router = useRouter();
  const [triggerResetCombobox, setTriggerResetCombobox] =
    useState<boolean>(false);

  const [selectOrderDate, setSelectOrderDate] = useState<Date | undefined>(
    isFormEdit && initData?.order_date
      ? new Date(initData.order_date)
      : undefined
  );
  const [selectReceivedDate, setSelectReceivedDate] = useState<
    Date | undefined
  >(
    isFormEdit && initData?.received_date
      ? new Date(initData?.received_date)
      : undefined
  );
  const [selectWarrantyPeriod, setSelectWarrantyPeriod] = useState<
    Date | undefined
  >(
    isFormEdit && initData?.warranty_period
      ? new Date(initData?.warranty_period)
      : undefined
  );
  const [selectInstallDate, setSelectInstallDate] = useState<Date | undefined>(
    isFormEdit && initData?.a_install_date
      ? new Date(initData?.a_install_date)
      : undefined
  );

  useEffect(() => {
    if (isFormEdit) {
      findSensorAirTypes(`getAirTypeById/${initData?.a_code}`);
    }
  }, [isFormEdit]);

  const clearAlert = () => {
    setShowAlert(null);
    if (isFormEdit) {
      router.push("/admin/management/air-conditioners");
    }
  };

  const findSensorAirTypes = async (apiPath: string) => {
    try {
      const response = await getData(apiPath, true);
      if (!response) {
        setShowAlert({
          type: "warning",
          detail: "Search failed, please try again.",
          onClose: clearAlert,
        });
        return;
      }

      setValue("airType", response.a_type.trim());
      setValue("airBTU", response.BTU);
      setValue("airInvater", response.invater);
    } catch (error) {
      setShowAlert({
        type: "error",
        detail: "Something went wrong, can not find merchant id",
        onClose: clearAlert,
      });
    }
  };

  const validateFormData = (data: IAirSchema): boolean => {
    let isValid = true;

    if (!data.roomCode) {
      setError("roomCode", {
        type: "server",
        message: "กรุณากรอกรหัสห้อง",
      });
      isValid = false;
    }

    if (!data.airId) {
      setError("airId", {
        type: "server",
        message: "กรุณากรอกรหัสแอร์",
      });
      isValid = false;
    }

    if (!data.airModel) {
      setError("airModel", {
        type: "server",
        message: "กรุณากรอกรุ่นของแอร์",
      });
      isValid = false;
    }

    if (!data.orderId) {
      setError("orderId", {
        type: "server",
        message: "กรุณากรอกรหัสสั่งซื้อ",
      });
      isValid = false;
    }

    if (!data.buyer) {
      setError("buyer", {
        type: "server",
        message: "กรุณากรอกรหัสสั่งซื้อ",
      });
      isValid = false;
    }

    if (!data.orderDate) {
      setError("orderDate", {
        type: "server",
        message: "กรุณาเลือกวันที่สั่งซื้อ",
      });
      isValid = false;
    }

    if (!data.receivedDate) {
      setError("receivedDate", {
        type: "server",
        message: "กรุณาเลือกวันที่รับเข้า",
      });
      isValid = false;
    }

    if (!data.warrantyPeriod) {
      setError("warrantyPeriod", {
        type: "server",
        message: "กรุณาเลือกวันที่หมดประกัน",
      });
      isValid = false;
    }

    if (!data.installDate) {
      setError("installDate", {
        type: "server",
        message: "กรุณาเลือกวันที่ติดตั้ง",
      });
      isValid = false;
    }

    if (!data.installer) {
      setError("installer", {
        type: "server",
        message: "กรุณากรอกชื่อผู้ติดตั้ง",
      });
      isValid = false;
    }

    return isValid;
  };

  const setFormData = async (data: IAirSchema) => {
    let formData = {
      rm_id: data.roomCode,
      a_id: data.airId,
      u_srID: data.sensorId,
      a_code: data.air,
      brand_code: data.airBrand,
      gen: data.airModel,
      order_id: data.orderId,
      buyer: data.buyer,
      order_date: formatDatetoISOStringWithoutTime(selectOrderDate),
      received_date: formatDatetoISOStringWithoutTime(selectReceivedDate),
      warranty_period: formatDatetoISOStringWithoutTime(selectWarrantyPeriod),
      a_install_date: formatDatetoISOStringWithoutTime(selectInstallDate),
      a_installer: data.installer,
    };
    return formData;
  };

  const onSubmit = async (data: IAirSchema) => {
    if (!validateFormData(data)) {
      return;
    }

    setShowAlert((el) => ({
      ...el,
      openModal: true,
      loading: true,
      onClose: clearAlert,
    }));

    const formData = await setFormData(data);
    // console.log("🚀 ~ onSubmit ~ formData:", formData);

    try {
      let response;
      // const selectedRoomType = roomTypes.find((item) => item.type === roomType);

      if (isFormEdit) {
        response = await updateData(
          "updateAir",
          session.user.accessToken,
          formData,
          data.airId,
          true
        );
      } else {
        response = await createData(
          "addAir",
          session.user.accessToken,
          formData,
          true
        );
        // console.log("🚀 ~ onSubmit ~ response:", response);
      }
      if (response && response.status === 200) {
        setShowAlert({
          openModal: true,
          loading: false,
          type: "success",
          detail: isFormEdit
            ? `แก้ไขข้อมูลเครื่องปรับอากาศ: ${initData?.a_id} สำเร็จ`
            : "เพิ่มเครื่องปรับอากาศสำเร็จ",
          onClose: clearAlert,
        });
        resetForm();
      } else {
        setShowAlert({
          openModal: true,
          loading: false,
          type: "warning",
          detail: isFormEdit
            ? `ผิดพลาด, โปรดลองอีกครั้ง.`
            : "ผิดพลาด, โปรดลองอีกครั้ง.",
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

  const resetForm = () => {
    setTriggerResetCombobox(true);
    setSelectInstallDate(undefined);
    setSelectOrderDate(undefined);
    setSelectReceivedDate(undefined);
    setSelectWarrantyPeriod(undefined);
    reset();
  };

  return (
    <div className="flex flex-1 items-start justify-start">
      <div className="grid gap-4 grid-cols-12 w-full relative">
        <div className="col-span-12 lg:col-span-6 xl:col-span-6">
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
                      activeAirId={
                        isFormEdit
                          ? airId?.slice(0, -3) + "-" + airId?.slice(-3)
                          : airId
                      }
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
        <div className="col-span-12 lg:col-span-6 xl:col-span-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  {isFormEdit
                    ? "แก้ไขข้อมูลเครื่องปรับอากาศ"
                    : "เพิ่มเครื่องปรับอากาศ"}
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
                    <FormLabel htmlFor="airId">รหัสแอร์</FormLabel>
                    <Input
                      {...register("airId")}
                      type="text"
                      id="airId"
                      placeholder="กรอกรหัสแอร์"
                      disabled={isFormEdit}
                    />
                    {errors.airId && (
                      <p className="text-sm text-red-500">
                        {errors.airId.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="sensorId">
                      Sensor ID
                    </FormLabel>
                    <Combobox
                      title="Sensor ID"
                      listData={sensorAirList}
                      defaultValue={getValues("sensorId")}
                      valueKey="u_srID"
                      nameKey="u_srID"
                      showValueWithName={false}
                      showResetButton={true}
                      triggerReset={triggerResetCombobox}
                      onValueChange={(selectedValue) => {
                        setValue("sensorId", selectedValue);
                      }}
                    />
                    {errors.sensorId && (
                      <p className="text-sm text-red-500">
                        {errors.sensorId.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="air">
                      แอร์
                    </FormLabel>
                    <Combobox
                      title="แอร์"
                      listData={airTypes}
                      defaultValue={getValues("air")}
                      valueKey="a_code"
                      nameKey="a_code"
                      showValueWithName={false}
                      showResetButton={true}
                      triggerReset={triggerResetCombobox}
                      onValueChange={(selectedValue) => {
                        setValue("air", selectedValue);
                        findSensorAirTypes(`getAirTypeById/${selectedValue}`);
                      }}
                    />
                    {errors.air && (
                      <p className="text-sm text-red-500">
                        {errors.air.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      <FormLabel className=" text-nowrap">ชนิดแอร์</FormLabel>
                      <Input
                        {...register("airType")}
                        type="text"
                        id="airType"
                        disabled
                      />
                      <FormLabel>BTU</FormLabel>
                      <Input
                        {...register("airBTU")}
                        type="number"
                        id="airBTU"
                        disabled
                      />
                      <FormLabel>Invater</FormLabel>
                      <Input
                        {...register("airInvater")}
                        type="number"
                        id="airInvater"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="airBrand">
                      ยี่ห้อแอร์
                    </FormLabel>
                    <Combobox
                      title="ยี่ห้อแอร์"
                      listData={airBrands}
                      defaultValue={getValues("airBrand")}
                      valueKey="brand_code"
                      nameKey="brand"
                      showValueWithName={false}
                      showResetButton={true}
                      triggerReset={triggerResetCombobox}
                      onValueChange={(selectedValue) => {
                        setValue("airBrand", selectedValue);
                      }}
                    />
                    {errors.airBrand && (
                      <p className="text-sm text-red-500">
                        {errors.airBrand.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="airModel">
                      รุ่น
                    </FormLabel>
                    <Input
                      {...register("airModel")}
                      type="text"
                      id="airModel"
                      placeholder="กรอกรุ่น"
                    />
                    {errors.airModel && (
                      <p className="text-sm text-red-500">
                        {errors.airModel.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="orderId">
                      รหัสสั่งซื้อ
                    </FormLabel>
                    <Input
                      {...register("orderId")}
                      type="text"
                      id="orderId"
                      placeholder="กรอกรหัสสั่งซื้อ"
                    />
                    {errors.orderId && (
                      <p className="text-sm text-red-500">
                        {errors.orderId.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="buyer">
                      ผู้สั่งซื้อ
                    </FormLabel>
                    <Input
                      {...register("buyer")}
                      type="text"
                      id="buyer"
                      placeholder="กรอกผู้สั่งซื้อ"
                    />
                    {errors.buyer && (
                      <p className="text-sm text-red-500">
                        {errors.buyer.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="orderDate">
                      วันที่สั่งซื้อ
                    </FormLabel>
                    <DateTimePicker
                      {...register("orderDate")}
                      displayFormat={{ hour24: "dd/MM/yyyy" }}
                      granularity="day"
                      value={selectOrderDate}
                      onChange={setSelectOrderDate}
                      locale={th}
                      placeholder="เลือกวันที่สั่งซื้อ"
                    />
                    {errors.orderDate && (
                      <p className="text-sm text-red-500">
                        {errors.orderDate.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="receivedDate">
                      วันที่รับเข้า
                    </FormLabel>
                    <DateTimePicker
                      {...register("receivedDate")}
                      displayFormat={{ hour24: "dd/MM/yyyy" }}
                      granularity="day"
                      value={selectReceivedDate}
                      onChange={setSelectReceivedDate}
                      locale={th}
                      placeholder="เลือกวันที่รับเข้า"
                    />
                    {errors.receivedDate && (
                      <p className="text-sm text-red-500">
                        {errors.receivedDate.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="warrantyPeriod">
                      วันที่หมดประกัน
                    </FormLabel>
                    <DateTimePicker
                      {...register("warrantyPeriod")}
                      displayFormat={{ hour24: "dd/MM/yyyy" }}
                      granularity="day"
                      value={selectWarrantyPeriod}
                      onChange={setSelectWarrantyPeriod}
                      locale={th}
                      placeholder="เลือกวันที่หมดประกัน"
                    />
                    {errors.warrantyPeriod && (
                      <p className="text-sm text-red-500">
                        {errors.warrantyPeriod.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="installDate">
                      วันที่ติดตั้ง
                    </FormLabel>
                    <DateTimePicker
                      {...register("installDate")}
                      displayFormat={{ hour24: "dd/MM/yyyy" }}
                      granularity="day"
                      value={selectInstallDate}
                      onChange={setSelectInstallDate}
                      locale={th}
                      placeholder="เลือกวันที่ติดตั้ง"
                    />
                    {errors.installDate && (
                      <p className="text-sm text-red-500">
                        {errors.installDate.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="installer">
                      ช่างติดตั้ง
                    </FormLabel>
                    <Input
                      {...register("installer")}
                      type="text"
                      id="installer"
                      placeholder="กรอกช่างติดตั้ง"
                    />
                    {errors.installer && (
                      <p className="text-sm text-red-500">
                        {errors.installer.message}
                      </p>
                    )}
                  </div>
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
