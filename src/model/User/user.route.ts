import express, { NextFunction, Request, Response } from 'express';
import * as userController from './user.controller.js'
export const userRouter = express.Router();




userRouter.post('/signup', (req, res, next) => {
    userController.signUp(req, res).catch(next);
  });

  userRouter.post('/login', (req, res, next) => {
    userController.login(req, res).catch(next);
  });

  