export interface FileUploadResponse {
    url: string;
    publicId: string;
    format: string;
    size: number;
    error?: string;
}