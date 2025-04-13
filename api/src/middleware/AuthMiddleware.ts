import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/JWT';
import ApiError from '../utils/ApiError';
import User from '../models/UserModel';

export const protect = async (
  req: Request & { user?: { id: string; role: string } }, 
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized to access this route. No token provided.');
    }

    // 2) Verifica e decodifica o token
    const decoded = await verifyToken(token);

    // 3) Busca o usuário no banco de dados
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new ApiError(401, 'The user belonging to this token no longer exists.');
    }

    req.user = {
      id: currentUser._id.toString(), 
      role: currentUser.role 
    };

    next();
  } catch (err) {
    next(err);
  }
};

export const authorize = (...roles: string[]) => {
  return (
    req: Request & { user?: { id: string; role: string } }, 
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Not authorized to access this route.'));
    }
    next();
  };
};