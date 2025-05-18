import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const validateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    //  Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
       res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
      return;
    }

    //  Verify token
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      req.user = {
        userId: decoded.userId,
        email: decoded.email,
      };

      next();
    });
  } catch (error) {
     res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
    return;
  }
};