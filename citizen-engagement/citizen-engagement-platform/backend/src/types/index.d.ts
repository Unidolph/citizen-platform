// src/types/index.d.ts

import { Express } from "express";
import { Buffer } from "node:buffer";

declare global {
  namespace Express {
    interface MulterFile {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    }

    interface Request {
      /** For single-file uploads */
      file?: MulterFile;
      /** For multiple file uploads */
      files?: { [fieldname: string]: MulterFile[] } | MulterFile[];
    }
  }
}

export {};
