import { ILoginSchema } from "@/types/form";
import axios from "axios";

export async function getAverageEnvironment() {
  try {
    const res = await axios.get(`${process.env.API_URL}/gaugeOutdoor`);

    if (!res.data) {
      return null;
    }

    return res.data;
  } catch (error) {
    console.log("🚀 ~ getAverageEnvironment ~ error:", error);
  }
}

export async function getAverageElectricityUsage() {
  try {
    const res = await axios.get(`${process.env.API_URL}/UseRatePerMonth`);

    if (!res.data) {
      return null;
    }

    return res.data;
  } catch (error) {
    console.log("🚀 ~ getAverageElectricityUsage ~ error:", error);
  }
}

export async function getPmTempHmdData() {
  try {
    const res = await axios.get(`${process.env.API_URL}/HTPMPerMonth`);

    if (!res.data) {
      return null;
    }
    return res.data;
  } catch (error) {
    console.log("🚀 ~ getPmTempHmdData ~ error:", error);
  }
}

export async function getData(apiPath: string) {
  try {
    const res = await axios.get(`${process.env.API_URL}/${apiPath}`);

    if (!res.data) {
      return null;
    }

    return res.data;
  } catch (error) {
    console.log("🚀 ~ getData ~ error:", error);
  }
}

export async function login(data: ILoginSchema) {
  console.log("🚀 ~ login ~ data:", data);
}
