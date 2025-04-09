import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/AuthService';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    
  };
}

export const getMe = async (
  req: AuthenticatedRequest, 
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await authService.getMe(req.user.id); 
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};