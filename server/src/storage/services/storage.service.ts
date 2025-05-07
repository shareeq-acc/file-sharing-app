import { Injectable, InternalServerErrorException, UnsupportedMediaTypeException } from '@nestjs/common';
import { StorageProviderResponse } from '../interfaces/storage-provider-response.interface';
import { CloudinaryService } from '../providers/cloudinary/cloudinary.service';
import { documentTypes, imageTypes } from '../constants/storage-provider.constants';
import { CustomFileValidator } from '../utils/CustomFileValidator';
import { response } from 'express';
import { DriveService } from '../providers/google-drive/drive.service';

@Injectable()
export class StorageService {
    constructor(
        private cloudinaryService: CloudinaryService,
        private driveService: DriveService,
    ) { }

    async uploadFile(file: Express.Multer.File): Promise<StorageProviderResponse> {
        console.log("Uploading File!");
        try {
            CustomFileValidator.initiateValidation(file);
            if (imageTypes.includes(file.mimetype)) {
                CustomFileValidator.validateImages(file);
                const response: StorageProviderResponse = await this.cloudinaryService.upload(file);
                return response;
            } else if (documentTypes.includes(file.mimetype)) {
                console.log("Uploading document...");
                const response: StorageProviderResponse = await this.driveService.upload(file);
                return response;
            }
            throw new UnsupportedMediaTypeException('File type not supported');
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('File upload failed');
        }
    }

    //   async deleteFile(fileId: string, provider: string): Promise<void> {
    //     const storageProvider = this.getProvider(provider);
    //     await storageProvider.deleteFile(fileId);
    //   }

    //   private getProvider(provider: string): IStorageProvider {
    //     switch (provider) {
    //       case 'cloudinary':
    //         return this.cloudinaryService;
    //       case 'google-drive':
    //         return this.googleDriveService;
    //       default:
    //         throw new BadRequestException('Invalid storage provider');
    //     }
    //   }
}