import { Module } from '@nestjs/common';
import { StorageService } from './services/storage.service';
import { CloudinaryService } from './providers/cloudinary/cloudinary.service';
import { CloudinaryProvider } from './providers/cloudinary/cloudinary.config';
import { DriveService } from './providers/google-drive/drive.service';
import { DriveProvider } from './providers/google-drive/drive.provider';

@Module({
  providers: [StorageService, CloudinaryService, CloudinaryProvider, DriveService, DriveProvider],
  exports:[StorageService]
})
export class StorageModule {}
