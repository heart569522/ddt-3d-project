import { ILoginSchema } from "@/types/form";
import axios from "axios";

export async function getDashboardData(apiPath: string, isClient?: boolean) {
  const apiUrl = isClient
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.API_URL;
  try {
    const res = await axios.get(`${apiUrl}/${apiPath}`);

    if (!res.data) {
      return null;
    }
    return res.data;
  } catch (error) {
    console.log("🚀 ~ getDashboardData ~ error:", error);
  }
}

export async function getData(apiPath: string, isClient?: boolean) {
  const apiUrl = isClient
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.API_URL;

  try {
    const res = await axios.get(`${apiUrl}/${apiPath}`);

    if (!res.data) {
      return null;
    }

    return res.data;
  } catch (error) {
    console.log("🚀 ~ getData ~ error:", error);
  }
}

export async function getDataById(
  apiPath: string,
  id: string | number,
  isClient?: boolean
) {
  const apiUrl = isClient
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.API_URL;

  try {
    const res = await axios.get(`${apiUrl}/${apiPath}/${id}`);

    if (!res.data) {
      return null;
    }

    return res.data;
  } catch (error) {
    // console.log("🚀 ~ getData ~ error:", error);
  }
}

export async function createData(
  apiPath: string,
  key?: string,
  data?: any,
  isClient?: boolean
) {
  const apiUrl = isClient
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.API_URL;

  try {
    const headers = key ? { "x-api-key": key } : {};
    const res = await axios.post(`${apiUrl}/${apiPath}`, data, {
      headers,
    });

    return res;
  } catch (error) {
    // console.log("🚀 ~ getData ~ error:", error);
    return null;
  }
}

export async function updateData(
  apiPath: string,
  key?: string,
  data?: any,
  id?: string | number,
  isClient?: boolean
) {
  const apiUrl = isClient
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.API_URL;

  try {
    const headers = key ? { "x-api-key": key } : {};
    const res = await axios.put(
      `${apiUrl}/${apiPath}/${id}`,
      data,
      {
        headers,
      }
    );

    return res;
  } catch (error) {
    // console.log("🚀 ~ getData ~ error:", error);
    return null;
  }
}

export async function deleteData(
  apiPath: string,
  key?: string,
  id?: string | number,
  isClient?: boolean
) {
  const apiUrl = isClient
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.API_URL;

  try {
    const headers = key ? { "x-api-key": key } : {};
    const res = await axios.delete(`${apiUrl}/${apiPath}/${id}`, {
      headers,
    });

    return res;
  } catch (error) {
    // console.log("🚀 ~ getData ~ error:", error);
    return null;
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

export async function refreshToken(refreshToken: string) {
  try {
    const res = await axios.post(`${process.env.API_URL}/auth/refresh-token`, {
      refreshToken,
    });

    if (!res.data) {
      return null;
    }

    return res.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}
