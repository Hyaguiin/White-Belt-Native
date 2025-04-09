import User from '../models/UserModel';
import { IUser, IUserInput } from '../interfaces/User';
import { generateToken } from '../utils/JWT';
import ApiError from '../utils/ApiError';


export const register = async (userData: IUserInput): Promise<{ user: IUser; token: string }> => {
  if (await User.findOne({ email: userData.email })) {
    throw new ApiError(400, 'Email already in use');
  }

  const user = await User.create(userData);
  const token = generateToken(user);
  
  return { user, token };
};

export const login = async (email: string, password: string): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }

  const token = generateToken(user);
  
  return { user, token };
};

export const getMe = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};