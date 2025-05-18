import mongoose, { ObjectId } from "mongoose";
import { Task } from "./task.schema.js";


interface ReturnResponse {
    update?: boolean;
    success?: boolean;
    data: any;
  }
  
export const addTask = (body: object): Promise<ReturnResponse>  => {
  return new Promise((resolve, reject) => {
    try {

      const result = new Task(body);

      result.save();

      if (result) {

        const { user_id, is_deleted, createdAt,updatedAt , __v, ...taskData } = result.toObject();

        resolve({ success: true, data: taskData });
      } else {
        return reject({ success: false, data: [] });
      }
    } catch (error: any) {
      return reject(error);
    }
  });
};

export const getAllTask = (userId:ObjectId):Promise<ReturnResponse> =>{
  return new Promise(async (resolve, reject) => {
     try {


      const result = await Task.find({user_id : userId, is_deleted:false},{user_id:0, is_deleted:0, createdAt:0, updatedAt:0, __v:0})

      if (result) {
        resolve({ success: true, data: result });
      } else {
        return reject({ success: false, data: [] });
      }
    } catch (error: any) {
      return reject(error);
    }
  })
}

export const getTaskById = (taskId:string):Promise<ReturnResponse> =>{
  return new Promise(async (resolve, reject) => {
     try {

      const result = await Task.find({_id:  new mongoose.Types.ObjectId(taskId)})

      if (result) {
        resolve({ success: true, data: [] });
      } else {
        resolve({ success: false, data: [] });
      }
    } catch (error: any) {
      return reject(error);
    }
  })
}


export const updateTask = (body: object, taskId: string): Promise<ReturnResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { success: existSuccess } = await getTaskById(taskId);
      if (!existSuccess) {
        return reject({
          message: "Task does not exist!",
          data: [],
          success: false,
        });
      }

      const result = await Task.findByIdAndUpdate(
        taskId,
        body,
        { new: true } 
      );

      if (result) {
        const { user_id, is_deleted, createdAt,updatedAt , __v, ...taskData } = result.toObject();

        resolve({ success: true, data: taskData });
      } else {
        reject({ success: false, data: [], message: "Update failed" });
      }
    } catch (error: any) {
      reject({ success: false, message: error.message, data: [] });
    }
  });
};

export const deleteTask = (taskId: string): Promise<ReturnResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { success: existSuccess } = await getTaskById(taskId);
      if (!existSuccess) {
        return reject({
          message: "Task does not exist!",
          data: [],
          success: false,
        });
      }

      const result = await Task.findByIdAndUpdate(
        taskId,
        {is_deleted:true},
      );

      if (result) {

        resolve({ success: true, data: [] });
      } else {
        reject({ success: false, data: [], message: "Update failed" });
      }
    } catch (error: any) {
      reject({ success: false, message: error.message, data: [] });
    }
  });
};

