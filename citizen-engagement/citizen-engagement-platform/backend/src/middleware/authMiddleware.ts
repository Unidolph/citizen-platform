import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { Document } from "mongoose";

// Define the User Document interface
export interface IUserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: IUserDocument | null;
}

// Protect middleware (checks token and loads user)
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

// Simple verification middleware (token only)
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Export default middleware alias
export const authMiddleware = verifyToken;
