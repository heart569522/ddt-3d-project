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
import { IBuilding, IRoomType } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Combobox from "../../combobox";
import ButtonLoading from "../../button-loading";
import { Input } from "@/components/shadcn-ui/input";
import { cn } from "@/lib/utils";
import { AlertBar, AlertProps } from "../../alert-bar";

interface Props {
  roomType: IRoomType;
  building: IBuilding;
}

export default function RoomForm({ roomType, building }: Props) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<IRoomSchema>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      airAmount: 0,
      lampAmount: 0,
      switchAmount: 0,
      receptacleAmount: 0,
    },
  });

  const [showAlert, setShowAlert] = useState<AlertProps | null>(null);
  const clearAlert = () => setShowAlert(null);

  const validateFormData = (data: IRoomSchema): boolean => {
    let isValid = true;

    if (!data.roomCode) {
      setError("roomCode", {
        type: "server",
        message: "Please enter room code.",
      });
      isValid = false;
    }

    if (!data.building) {
      setError("building", {
        type: "server",
        message: "Please select building.",
      });
      isValid = false;
    }

    if (!data.roomName) {
      setError("roomName", {
        type: "server",
        message: "Please enter room name.",
      });
      isValid = false;
    }

    if (!data.roomType) {
      setError("roomType", {
        type: "server",
        message: "Please select room type.",
      });
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async (data: IRoomSchema) => {
    if (!validateFormData(data)) {
      return;
    }

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
    // let url = `MenuProfile/${merchantId}/translate?menuprofilecode=${encodeURIComponent(
    //   menuProfileCode
    // )}&language=${language}`;

    // try {
    //   // const response = await getData(endPoint, url);
    //   const response = await axios.get(`${endPoint}/api/${url}`, {
    //     headers: {
    //       Accept: "application/json",
    //       key: endPointToken(endPoint as string),
    //     },
    //   });
    //   if (response.status === 200) {
    //     setData(response.data);
    //   } else {
    //     setShowAlert({
    //       type: "warning",
    //       detail: "Search failed, please try again.",
    //       onClose: clearAlert,
    //     });
    //     return;
    //   }
    // } catch {
    //   setShowAlert({
    //     type: "error",
    //     detail: "Something went wrong, please try again later",
    //     onClose: clearAlert,
    //   });
    // }
  };

  return (
    <div className="flex flex-1 items-start justify-start">
      <div className="grid gap-4 grid-cols-12 w-full relative">
        <div className="col-span-12 lg:col-span-6 xl:col-span-5"></div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                {/* <CardTitle className="text-xl md:text-2xl">
                  Search by Merchant ID
                </CardTitle> */}
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="roomCode">Room Code</Label>
                    <Input
                      {...register("roomCode")}
                      type="text"
                      id="roomCode"
                      placeholder="Enter Room Code"
                    />
                    {errors.roomCode && (
                      <p className="text-sm text-red-500">
                        {errors.roomCode.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="Building">Building</Label>
                    <Combobox
                      title="Building"
                      listData={building}
                      valueKey="bu_id"
                      nameKey="bu_name"
                      showValueWithName={true}
                      showResetButton={true}
                      onValueChange={(selectedValue) => {
                        setValue("building", selectedValue);
                      }}
                    />
                    {errors.building && (
                      <p className="text-sm text-red-500">
                        {errors.building.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="roomName">Room Name</Label>
                    <Input
                      {...register("roomName")}
                      type="text"
                      id="roomName"
                      placeholder="Enter Room Name"
                    />
                    {errors.roomName && (
                      <p className="text-sm text-red-500">
                        {errors.roomName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="roomType">Room Type</Label>
                    <Combobox
                      title="Room Type"
                      listData={roomType}
                      valueKey="rm_type"
                      nameKey="type"
                      showValueWithName={false}
                      showResetButton={true}
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
                  <hr className="h-1" />
                  <div className="grid grid-cols-12 gap-3">
                    <div
                      className={cn(
                        "flex justify-between gap-2 items-center col-span-12 sm:col-span-6"
                      )}
                    >
                      <Label htmlFor="airAmount">Air</Label>
                      <Input
                        {...register("airAmount")}
                        type="number"
                        id="airAmount"
                        placeholder=""
                        className="text-right"
                        min={0}
                      />
                      <Label htmlFor="airAmount">Unit.</Label>
                    </div>
                    <div
                      className={cn(
                        "flex justify-between gap-2 items-center col-span-12 sm:col-span-6"
                      )}
                    >
                      <Label htmlFor="lampAmount">Lamp</Label>
                      <Input
                        {...register("lampAmount")}
                        type="number"
                        id="lampAmount"
                        placeholder=""
                        className="text-right"
                        min={0}
                      />
                      <Label htmlFor="lampAmount">Unit.</Label>
                    </div>
                    <div
                      className={cn(
                        "flex justify-between gap-2 items-center col-span-12 sm:col-span-6"
                      )}
                    >
                      <Label htmlFor="switchAmount">Switches</Label>
                      <Input
                        {...register("switchAmount")}
                        type="number"
                        id="switchAmount"
                        placeholder=""
                        className="text-right"
                        min={0}
                      />
                      <Label htmlFor="switchAmount">Unit.</Label>
                    </div>
                    <div
                      className={cn(
                        "flex justify-between gap-2 items-center col-span-12 sm:col-span-6"
                      )}
                    >
                      <Label htmlFor="receptacleAmount">Receptacle</Label>
                      <Input
                        {...register("receptacleAmount")}
                        type="number"
                        id="receptacleAmount"
                        placeholder=""
                        className="text-right"
                        min={0}
                      />
                      <Label htmlFor="receptacleAmount">Unit.</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2 justify-center">
                <ButtonLoading
                  text="Submit"
                  textLoading="Submitting"
                  isLoading={isSubmitting}
                />
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
      {showAlert && (
        <AlertBar
          type={showAlert.type}
          detail={showAlert.detail}
          onClose={clearAlert}
        />
      )}
    </div>
  );
}
