import { BadRequestException } from "@nestjs/common";
import {documentTypes, imageTypes, MAX_FILE_SIZE } from "src/storage/constants/storage-provider.constants";

export class CustomFileValidator{


    public static initiateValidation(file: Express.Multer.File): void {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        if (file.size > MAX_FILE_SIZE) {
            throw new BadRequestException(
                `File size exceeds limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`
            );
        }
    }

    public static validateImages(file: Express.Multer.File) {
        if (!imageTypes.includes(file.mimetype)) {
            throw new BadRequestException(
                `Invalid file type. Allowed types: ${imageTypes.join(', ')}`
            );
        }
    }

    public static validateDocuments(file: Express.Multer.File) {
        if (!documentTypes.includes(file.mimetype)) {
            throw new BadRequestException(
                `Invalid file type. Allowed types: ${documentTypes.join(', ')}`
            );
        }
    }
}
