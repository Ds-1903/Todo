import { Task } from "../model/Task/task.schema.js";

export const statusUpdateCron = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await Task.updateMany(
      {
        is_deleted: false,
        completed: false,
        due_date: { $lt: today },
      },
      { $set: { completed: true } }
    );

    console.log( {
      success: true,
      message: `Status update completed: ${result.modifiedCount} Tasks Modified `,
    })
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
