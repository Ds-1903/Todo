import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express';

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
) => {
  try {
    //  Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.send({
        success: false,
        message: 'Access token is required',
      });
    }

    //  Verify token
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid or expired token',
        });
      }

      req.user = {
        userId: decoded.userId,
        email: decoded.email,
      };

      next();
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};