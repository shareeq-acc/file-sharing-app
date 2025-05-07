import { StorageProviderResponse } from "./storage-provider-response.interface";

export interface StorageProvider {
    upload(file: Express.Multer.File): Promise<StorageProviderResponse>;
    delete(publicId: string): Promise<void>;
}