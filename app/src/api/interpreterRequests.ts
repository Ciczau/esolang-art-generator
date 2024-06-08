import { AxiosError, AxiosResponse } from "axios";
import instance from "./instance";

export const interpreteLanguageRequest = async (
  language: string,
  code: string
): Promise<AxiosResponse> => {
  try {
    const response = await instance({
      url: "/api/interprete",
      method: "POST",
      data: { language, code },
    });
    return response;
  } catch (e: any) {
    console.error(e);
    return e.response;
  }
};
