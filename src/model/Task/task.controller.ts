import { Request, Response } from "express";
import * as taskService from "./task.service.js";
import { ObjectId } from "mongoose";

interface ReturnResponse {
  message: string;
  success: boolean;
  data: object;
}
interface AuthenticatedRequest extends Request {
  user?: {
    userId: ObjectId;
    email: string;
  };
}

//Add Task
export const addTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response<ReturnResponse>> => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized", data: [] });
    }

    const { body = {} } = req;
    const { userId } = req.user;

    body["user_id"] = userId;
    body["due_date"] = parseDateString(body.due_date);
    const { success, data } = await taskService.addTask(body);

    return res.send({
      success,
      message: success ? "Task added successfully" : "Something went wrong",
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

//Get all task userwise
export const getAllTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response<ReturnResponse>> => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized", data: [] });
    }

    const { userId } = req.user;

    const { success, data } = await taskService.getAllTask(userId);

    return res.send({
      success,
      message: success ? "Tasks fetched successfully" : "No data found!",
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

//Get all task userwise
export const updateTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response<ReturnResponse>> => {
  try {
    const { taskId } = req.params;
    const { body = {} } = req;

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized", data: [] });
    }
    body.due_date
      ? (body["due_date"] = parseDateString(body.due_date))
      : body.due_date;
    const { success, data } = await taskService.updateTask(body, taskId);

    return res.send({
      success,
      message: success ? "Tasks updated successfully" : "No data found!",
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

//deleteTask
export const deleteTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response<ReturnResponse>> => {
  try {
    const { taskId } = req.params;

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized", data: [] });
    }

    const { success, data } = await taskService.deleteTask(taskId);

    return res.send({
      success,
      message: success ? "Task deleted successfully" : "Something went wrong",
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

function parseDateString(dateStr: string): Date | null {
  const [day, month, year] = dateStr.split("/");

  if (!day || !month || !year) return null;

  const date = new Date(`${year}-${month}-${day}`);
  return isNaN(date.getTime()) ? null : date;
}
