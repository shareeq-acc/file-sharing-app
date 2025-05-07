import { StorageProviderResponse } from "src/storage/interfaces/storage-provider-response.interface";
import { StorageProvider } from "src/storage/interfaces/storage-provider.interface";
import { BadRequestException, Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { drive_v3, google } from "googleapis";
import { createReadStream } from 'fs';

import { GOOGLE_DRIVE_CLIENT } from './drive.provider';
import { Readable } from "typeorm/platform/PlatformTools";

export class DriveService implements StorageProvider {
    private readonly logger = new Logger(DriveService.name);
    private readonly defaultFolderId: string;

    constructor(
        @Inject(GOOGLE_DRIVE_CLIENT) private readonly drive: drive_v3.Drive,
        private configService: ConfigService,
      ) {
        this.defaultFolderId = this.configService.get('GOOGLE_DRIVE_FOLDER_ID');
        this.logger.log('Google Drive Service initialized');
        this.logger.debug(`Default folder ID: ${this.defaultFolderId}`);
    }

    async upload(file: Express.Multer.File): Promise<StorageProviderResponse> {
        try {

            const stream = new Readable();
            stream.push(file.buffer);
            stream.push(null);
            
            this.logger.debug(`Starting upload for file: ${file.originalname}`);
            this.logger.debug(`File details: size=${file.size}, mimetype=${file.mimetype}, path=${file.path}`);
            const fileMetadata = {
                name: file.filename,
                parents: this.defaultFolderId ? [this.defaultFolderId] : undefined,
            };

            const media = {
                mimeType: file.mimetype,
                body: stream,
            };


            this.logger.debug(`Uploading to folder: ${this.defaultFolderId}`);
            this.logger.debug(`File will be saved as: ${file.originalname}`);
            const response = await this.drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id, webViewLink',
            }).catch(error => {
                this.logger.error('Drive API Error:', error.response?.data || error.message);
                throw error;
            });

            this.logger.debug(`File created with ID: ${response.data.id}`);
            this.logger.debug('Setting file permissions...');

            await this.drive.permissions.create({
                fileId: response.data.id,
                requestBody: {
                  role: 'reader',
                  type: 'anyone',
                },
            }).catch(error => {
                this.logger.error('Permission Error:', error.response?.data || error.message);
                throw error;
            });


            const storageResponse : StorageProviderResponse = {
                originalName: file.originalname,
                url: response.data.webViewLink,
                publicId: response.data.id,
                format: file.mimetype,
                size: file.size
            }

            return storageResponse;

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to upload file!");
        }
    }

    delete(publicId: string): Promise<void> {
        return Promise.resolve();
    }
}