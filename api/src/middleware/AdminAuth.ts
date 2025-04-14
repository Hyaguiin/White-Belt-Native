import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

export const verificarAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto") as { userId: string; role: string };

    (req as AuthRequest).userId = decoded.userId;
    (req as AuthRequest).role = decoded.role;

    if (decoded.role !== "admin") {
      res.status(403).json({ message: "Acesso negado. Permissão de administrador necessária." });
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};
