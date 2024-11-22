"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { airSchema, ILampSchema, lampSchema } from "@/types/form";
import {
  IBulbBrands,
  IBulbTypes,
  ILamp,
  ILampBrands,
  ILampTypes,
  ISensorSwitch,
} from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Combobox from "../../combobox";
import ButtonLoading from "../../button-loading";
import { Input } from "@/components/shadcn-ui/input";
import { cn } from "@/lib/utils";
import { AlertModal, AlertProps } from "../../alert-modal";
import { Session } from "next-auth";
import { createData, getData, updateData } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { th } from "date-fns/locale";
import { formatDatetoISOStringWithoutTime } from "@/lib/formats";
import FormLabel from "../../form-label";
import CanvasScreen from "../../canvas-screen/canvas";
import EN12408Floor from "@/components/models/en124/floor-room/en12408-floor";

interface Props {
  lampTypes: ILampTypes[];
  bulbTypes: IBulbTypes[];
  lampBrands: ILampBrands;
  bulbBrands: IBulbBrands;
  sensorSwitch: ISensorSwitch;
  session: Session;
  isFormEdit?: boolean;
  initData?: ILamp;
}

export default function LampForm({
  lampTypes,
  bulbTypes,
  lampBrands,
  bulbBrands,
  sensorSwitch,
  session,
  isFormEdit = false,
  initData,
}: Props) {
  // console.log("🚀 ~ lampTypes:", lampTypes)
  // console.log("🚀 ~ sensorSwitch:", sensorSwitch)
  // console.log("🚀 ~ initData:", initData)
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ILampSchema>({
    resolver: zodResolver(lampSchema),
    defaultValues: {
      roomCode: isFormEdit ? initData?.rm_id : undefined,
      lampId: isFormEdit ? initData?.l_id : undefined,
      sensorId: isFormEdit ? initData?.u_srID : undefined,
      lamp: isFormEdit ? initData?.l_code : undefined,
      lampBrand: isFormEdit ? initData?.brand_code : undefined,
      bulb: isFormEdit ? initData?.lb_code : undefined,
      bulbBrand: isFormEdit ? initData?.brand_code_lb : undefined,
      installDate:
        isFormEdit && initData?.l_install_date
          ? new Date(initData?.l_install_date)
          : undefined,
      installer: isFormEdit ? initData?.l_installer : undefined,
    },
  });

  console.log(getValues());
  console.log("Errors:", errors);

  const [showAlert, setShowAlert] = useState<AlertProps | null>(null);
  const router = useRouter();
  const [triggerResetCombobox, setTriggerResetCombobox] =
    useState<boolean>(false);

  const [selectInstallDate, setSelectInstallDate] = useState<Date | undefined>(
    isFormEdit && initData?.l_install_date
      ? new Date(initData?.l_install_date)
      : undefined
  );

  useEffect(() => {
    if (isFormEdit) {
      findSensorLampTypes(`getLampTypeById/${initData?.l_code}`);
      findBulbTypes(`getBulbTypeById/${initData?.lb_code}`);
    }
  }, [isFormEdit]);

  const clearAlert = () => {
    setShowAlert(null);
    if (isFormEdit) {
      router.push("/admin/management/lamp-plug");
    }
  };

  const findSensorLampTypes = async (apiPath: string) => {
    try {
      const response = await getData(apiPath);
      if (!response) {
        setShowAlert({
          type: "warning",
          detail: "Search failed, please try again.",
          onClose: clearAlert,
        });
        return;
      }

      setValue("lampType", response.l_type.trim());
      setValue("lampShape", response.l_shape);
      setValue("lampBulbSocket", response.l_electrode);
      setValue("lampBulbAmount", response.lb_amount);
    } catch (error) {
      setShowAlert({
        type: "error",
        detail: "Something went wrong, can not find data",
        onClose: clearAlert,
      });
    }
  };

  const findBulbTypes = async (apiPath: string) => {
    try {
      const response = await getData(apiPath);
      if (!response) {
        setShowAlert({
          type: "warning",
          detail: "Search failed, please try again.",
          onClose: clearAlert,
        });
        return;
      }

      setValue("bulbType", response.lb_type.trim());
      setValue("bulbShape", response.lb_shape);
      setValue("bulbWatt", response.lb_watt);
      setValue("bulbLength", response.lb_size);
      setValue("bulbColor", response.lb_colorcode);
    } catch (error) {
      setShowAlert({
        type: "error",
        detail: "Something went wrong, can not find data",
        onClose: clearAlert,
      });
    }
  };

  const validateFormData = (data: ILampSchema): boolean => {
    let isValid = true;

    if (!data.roomCode) {
      setError("roomCode", {
        type: "server",
        message: "กรุณากรอกรหัสห้อง",
      });
      isValid = false;
    }

    if (!data.lampId) {
      setError("lampId", {
        type: "server",
        message: "กรุณากรอกรหัสโคมไฟ",
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

  const setFormData = async (data: ILampSchema) => {
    let formData = {
      rm_id: data.roomCode,
      l_id: data.lampId,
      u_srID: data.sensorId,
      l_code: data.lamp,
      brand_code: data.lampBrand,
      lb_code: data.bulb,
      brand_code_lb: data.bulbBrand,
      l_install_date: formatDatetoISOStringWithoutTime(selectInstallDate),
      l_installer: data.installer,
    };
    return formData;
  };

  const onSubmit = async (data: ILampSchema) => {
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

      if (isFormEdit) {
        response = await updateData(
          "updateLamp",
          session.user.accessToken,
          formData,
          data.lampId
        );
      } else {
        response = await createData(
          "addLamp",
          session.user.accessToken,
          formData
        );
        // console.log("🚀 ~ onSubmit ~ response:", response);
      }
      if (response && response.status === 200) {
        setShowAlert({
          openModal: true,
          loading: false,
          type: "success",
          detail: isFormEdit
            ? `Update lamp: ${initData?.l_id} success`
            : "Create new lamp success",
          onClose: clearAlert,
        });
        resetForm();
      } else {
        setShowAlert({
          openModal: true,
          loading: false,
          type: "warning",
          detail: isFormEdit
            ? `Update faild, please try again.`
            : "Create new lamp faild, please try again.",
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
    reset();
  };

  return (
    <div className="flex flex-1 items-start justify-start">
      <div className="grid gap-4 grid-cols-12 w-full relative">
        <div className="col-span-12 lg:col-span-6 xl:col-span-6">
          <div className="h-[500px]">
            <CanvasScreen
              model={
                <EN12408Floor
                  isShowLamp={true}
                  isShowAir={true}
                  isManage={true}
                  castShadow
                  receiveShadow
                />
              }
              cameraPosition={[0, 0, 90]}
              controlSettings={{
                minPolarAngle: 0,
                maxPolarAngle: 0,
                minDistance: 15,
                maxDistance: 35,
                enablePan: true,
                enableRotate: false,
              }}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  {isFormEdit ? "แก้ไขข้อมูลโคมไฟ" : "เพิ่มโคมไฟ"}
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
                      value={getValues("roomCode")}
                      disabled={isFormEdit}
                    />
                    {errors.roomCode && (
                      <p className="text-sm text-red-500">
                        {errors.roomCode.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel htmlFor="lampId">รหัสโคมไฟ</FormLabel>
                    <Input
                      {...register("lampId")}
                      type="text"
                      id="lampId"
                      placeholder="กรอกรหัสโคมไฟ"
                      disabled={isFormEdit}
                    />
                    {errors.lampId && (
                      <p className="text-sm text-red-500">
                        {errors.lampId.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="sensorId">
                      Sensor ID
                    </FormLabel>
                    <Combobox
                      title="Sensor ID"
                      listData={sensorSwitch}
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
                    <FormLabel required htmlFor="lamp">
                      โคมไฟ
                    </FormLabel>
                    <Combobox
                      title="โคมไฟ"
                      listData={lampTypes}
                      defaultValue={getValues("lamp")}
                      valueKey="l_code"
                      nameKey="l_code"
                      showValueWithName={false}
                      showResetButton={true}
                      triggerReset={triggerResetCombobox}
                      onValueChange={(selectedValue) => {
                        setValue("lamp", selectedValue),
                          findSensorLampTypes(
                            `getLampTypeById/${selectedValue}`
                          );
                      }}
                    />
                    {errors.lamp && (
                      <p className="text-sm text-red-500">
                        {errors.lamp.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      <FormLabel className="text-nowrap">ชนิดโคม</FormLabel>
                      <Input
                        {...register("lampType")}
                        type="text"
                        id="lampType"
                        disabled
                      />
                      <FormLabel className="text-nowrap">รูปทรงโคม</FormLabel>
                      <Input
                        {...register("lampShape")}
                        type="text"
                        id="lampShape"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      <FormLabel className="text-nowrap">ขั้ว</FormLabel>
                      <Input
                        {...register("lampBulbSocket")}
                        type="text"
                        id="lampBulbSocket"
                        disabled
                      />
                      <FormLabel className="text-nowrap">จำนวนหลอด</FormLabel>
                      <Input
                        {...register("lampBulbAmount")}
                        type="number"
                        id="lampBulbAmount"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="lampBrand">
                      ยี่ห้อโคมไฟ
                    </FormLabel>
                    <Combobox
                      title="ยี่ห้อโคมไฟ"
                      listData={lampBrands}
                      defaultValue={getValues("lampBrand")}
                      valueKey="brand_code"
                      nameKey="brand"
                      showValueWithName={false}
                      showResetButton={true}
                      triggerReset={triggerResetCombobox}
                      onValueChange={(selectedValue) => {
                        setValue("lampBrand", selectedValue);
                      }}
                    />
                    {errors.lampBrand && (
                      <p className="text-sm text-red-500">
                        {errors.lampBrand.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="lamp">
                      หลอด
                    </FormLabel>
                    <Combobox
                      title="หลอด"
                      listData={bulbTypes}
                      defaultValue={getValues("bulb")}
                      valueKey="lb_code"
                      nameKey="lb_code"
                      showValueWithName={false}
                      showResetButton={true}
                      triggerReset={triggerResetCombobox}
                      onValueChange={(selectedValue) => {
                        setValue("bulb", selectedValue),
                          findBulbTypes(`getBulbTypeById/${selectedValue}`);
                      }}
                    />
                    {errors.lamp && (
                      <p className="text-sm text-red-500">
                        {errors.lamp.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      <FormLabel className="text-nowrap">ชนิดหลอด</FormLabel>
                      <Input
                        {...register("bulbType")}
                        type="text"
                        id="bulbType"
                        disabled
                      />
                      <FormLabel className="text-nowrap">รูปทรงหลอด</FormLabel>
                      <Input
                        {...register("bulbShape")}
                        type="text"
                        id="bulbShape"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      <FormLabel className="text-nowrap">วัตต์</FormLabel>
                      <Input
                        {...register("bulbWatt")}
                        type="text"
                        id="bulbWatt"
                        disabled
                      />
                      <FormLabel className="text-nowrap">
                        ความยาว (ซม.)
                      </FormLabel>
                      <Input
                        {...register("bulbLength")}
                        type="string"
                        id="bulbLength"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      <FormLabel className="text-nowrap">รหัสสี</FormLabel>
                      <Input
                        {...register("bulbColor")}
                        type="text"
                        id="bulbColor"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <FormLabel required htmlFor="bulbBrand">
                      ยี่ห้อหลอด
                    </FormLabel>
                    <Combobox
                      title="ยี่ห้อหลอด"
                      listData={bulbBrands}
                      defaultValue={getValues("bulbBrand")}
                      valueKey="brand_code"
                      nameKey="brand"
                      showValueWithName={false}
                      showResetButton={true}
                      triggerReset={triggerResetCombobox}
                      onValueChange={(selectedValue) => {
                        setValue("bulbBrand", selectedValue);
                      }}
                    />
                    {errors.bulbBrand && (
                      <p className="text-sm text-red-500">
                        {errors.bulbBrand.message}
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
