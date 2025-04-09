import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserInput {
  name: string;
  email: string;
  password: string;
}