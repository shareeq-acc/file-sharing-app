import { StorageProviderResponse } from "src/storage/interfaces/storage-provider-response.interface";
import { StorageProvider } from "src/storage/interfaces/storage-provider.interface";
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import {  v2 as cloudinary } from 'cloudinary';

import toStream = require('buffer-to-stream');
import { CLOUDINARY_FILE_FOLDER } from "src/storage/constants/storage-provider.constants";

export class CloudinaryService implements StorageProvider {

    async upload(file: Express.Multer.File): Promise<StorageProviderResponse> {
            try {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            resource_type: 'auto',
                            CLOUDINARY_FILE_FOLDER ,
                        },
                        (error, result) => {
                            if (error) return reject(error);
                            const response: StorageProviderResponse = {
                                originalName: file.originalname,
                                url: result.secure_url,
                                publicId: result.public_id,
                                format: result.format,
                                size: result.bytes
                            }
                            resolve(response);
                        }
                    );
    
                    toStream(file.buffer).pipe(uploadStream);
                });
    
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