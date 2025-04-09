import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/AuthService';
import { IUserInput } from '../interfaces/User';
import ApiError from '../utils/ApiError';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await authService.getMe((req as any).user.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};