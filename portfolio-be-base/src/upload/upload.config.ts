import { diskStorage } from 'multer';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { extname, join } from 'path';
import * as fs from 'fs';

// Centralized upload configuration
export const UPLOAD_ROUTE: string = process.env.UPLOAD_ROUTE || '/uploads';
export const UPLOAD_DIR: string = process.env.UPLOAD_DIR || join(process.cwd(), 'uploads');

// Ensure the upload directory exists at startup
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const imageMulterOptions: MulterOptions = {
  storage: diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      callback(null, true);
    } else {
      callback(new Error('Only image files are allowed!'), false);
    }
  },
};

export const buildPublicUploadPath = (filename: string): string => `${UPLOAD_ROUTE}/${filename}`;


