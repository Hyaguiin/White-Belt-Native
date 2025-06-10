import jwt, { SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { IUser } from '../interfaces/User';

interface JwtPayload {
  id: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env');
}

const normalizeExpiresIn = (): number | StringValue => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

  if (/^\d+$/.test(expiresIn)) {
    return parseInt(expiresIn, 10);
  }

  const validUnits = ['s', 'm', 'h', 'd'];
  const unit = expiresIn.slice(-1);
  const value = expiresIn.slice(0, -1);

  if (validUnits.includes(unit) && !isNaN(Number(value))) {
    return expiresIn as StringValue;
  }

  throw new Error(`Invalid format for JWT_EXPIRES_IN: ${expiresIn}. Use numbers (3600) or strings like "1h", "2d"`);
};

const getSignOptions = (): SignOptions => {
  const expiresIn = normalizeExpiresIn();

  return {
    expiresIn
  };
};

export const generateToken = (user: IUser): string => {
  const payload: JwtPayload = {
    id: user._id.toString(),
    role: user.role
  };

  return jwt.sign(payload, JWT_SECRET, getSignOptions());
};

export const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(new Error('Invalid token'));
      
      if (typeof decoded !== 'object' || decoded === null || !('id' in decoded)) {
        return reject(new Error('Malformed token'));
      }

      resolve(decoded as JwtPayload);
    });
  });
};
