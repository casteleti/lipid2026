import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  // Fichas técnicas, especificações e certificados de análise dos ingredientes.
  'application/pdf',
  // Materiais ricos da área de conteúdo (apresentações e planilhas).
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB — ficha técnica com gráficos passa de 5MB
export const UPLOADS_DIR = join(process.cwd(), 'uploads');

@Controller('upload')
export class UploadController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOADS_DIR,
        filename: (_req, file, callback) => {
          callback(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (_req, file, callback) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          callback(
            new BadRequestException(
              'Aceitos: imagens (JPEG, PNG, WebP), PDF, PPT/PPTX, XLS/XLSX e CSV',
            ),
            false,
          );
          return;
        }
        callback(null, true);
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    return {
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      // Nome que o usuário enviou — o do disco é um uuid, ilegível como rótulo de download.
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
