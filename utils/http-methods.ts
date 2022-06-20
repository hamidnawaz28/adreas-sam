import axios from "axios";
import { AuditLogsResponce } from "../ts/common";

export const get = async (url: string) => {
  try {
    let res = null;
    res = await axios.get<AuditLogsResponce>(url);
    return {
      success: res.data.success,
      result: res.data.result,
      elapsed: res.data.elapsed,
      message: "Success",
    };
  } catch (error: any) {
    return { ...parseErrors(error.response), data: [], elapsed: 0 };
  }
};

const parseErrors = (errObj: any) => {
  try {
    let message = "";
    const { errors } = errObj.data;
    switch (errObj.status) {
      case 400:
        errors.map((obj: any, index: number) => {
          message = `${message + obj.param.toUpperCase()}: ${obj.msg}`;
          message = index === errors.length - 1 ? message : `${message} ,`;
          return message;
        });
        return {
          success: false,
          message,
        };
      case 401:
        return {
          success: false,
          message:
            errObj.data && errObj.data.message
              ? errObj.data.message
              : "You are not authorized. Please login",
        };
      case 403:
      case 404:
      case 409:
      case 422:
        return {
          success: false,
          message: errObj.data
            ? errObj.data.message
            : errObj.message
            ? errObj.message
            : "An error occured while processing your request.",
        };
      default:
        return {
          success: false,
          message: "An error occured while processing your request.",
        };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occured while processing your request.",
    };
  }
};
