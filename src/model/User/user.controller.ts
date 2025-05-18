import { Request, Response } from "express";
import * as userService from "./user.service.js";

interface ReturnResponse {
  message: string;
  success: boolean;
  data: object;
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response<ReturnResponse>> => {
  try {
    const { body = {} } = req;

    const { success, data } = await userService.signUp(body);

    return res.send({
      message: success ? "User signup successfully" : "Something went wrong",
      data: data || [],
      success,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message || "Internal server error",
      data: [],
      success: false,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response<ReturnResponse>> => {
  try {
    const { body = {} } = req;

    const { success, data } = await userService.login(body);

    return res.send({
      success,
      message: success ? "User loggedIn successfully" : "Something went wrong",
      data: data || [],
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message || "Internal server error",
      data: [],
    });
  }
};
