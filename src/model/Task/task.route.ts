import express, { NextFunction, Request, Response } from 'express';
import { validateToken } from '../../middleware/validateToken.js';
import * as taskController from './task.controller.js'
export const taskRouter = express.Router();




taskRouter.post('/add', validateToken, (req, res, next) => {
  taskController.addTask(req, res).catch(next);
  });

  taskRouter.get('/',validateToken, (req, res, next) => {
    taskController.getAllTask(req, res).catch(next);
  });

  taskRouter.put('/:taskId', validateToken,(req, res, next) => {
    taskController.updateTask(req, res).catch(next);
  });

  taskRouter.delete('/:taskId', validateToken, (req, res, next) => {
    taskController.deleteTask(req, res).catch(next);
  });

  