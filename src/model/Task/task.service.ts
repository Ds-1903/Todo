import mongoose, { ObjectId } from "mongoose";
import { Todo } from "./task.schema.js";


interface ReturnResponse {
    update?: boolean;
    success?: boolean;
    data: any;
  }
  
export const addTask = (body: any): Promise<ReturnResponse>  => {
  return new Promise((resolve, reject) => {
    try {

      const result = new Todo(body);

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


      const result = await Todo.find({user_id : userId, is_deleted:false},{user_id:0, is_deleted:0, createdAt:0, updatedAt:0, __v:0})

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

export const getTaskById = (taskId:ObjectId):Promise<ReturnResponse> =>{
  return new Promise(async (resolve, reject) => {
     try {

      const result = await Todo.find({_id:  new mongoose.Types.ObjectId(taskId)})

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


export const updateTask = (body: any, taskId: ObjectId): Promise<ReturnResponse> => {
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

      const result = await Todo.findByIdAndUpdate(
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

export const deleteTask = (taskId: ObjectId): Promise<ReturnResponse> => {
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

      const result = await Todo.findByIdAndUpdate(
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

