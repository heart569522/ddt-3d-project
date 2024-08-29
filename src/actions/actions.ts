import { authOptions } from "@/auth";
import { ILoginSchema } from "@/types/form";
import axios from "axios";
import { getServerSession } from "next-auth";

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

export async function getData(apiPath: string, key?: string) {
  try {
    const headers = key ? { "x-api-key": key } : {};
    const res = await axios.get(`${process.env.API_URL}/${apiPath}`, {
      headers,
    });

    if (!res.data) {
      return null;
    }

    return res.data;
  } catch (error) {
    console.log("🚀 ~ getData ~ error:", error);
  }
}

export async function getDataById(apiPath: string, id: string | number, key?: string) {
  try {
    const headers = key ? { "x-api-key": key } : {};
    const res = await axios.get(`${process.env.API_URL}/${apiPath}/${id}`, {
      headers,
    });

    if (!res.data) {
      return null;
    }

    return res.data;
  } catch (error) {
    console.log("🚀 ~ getData ~ error:", error);
  }
}

export async function login(data: ILoginSchema) {
  try {
    const res = await axios.post(`${process.env.API_URL}/auth/login`, data);

    if (!res.data) {
      return null;
    }

    return res;
  } catch (error) {
    // console.log("🚀 ~ getData ~ error:", error);
  }
}
