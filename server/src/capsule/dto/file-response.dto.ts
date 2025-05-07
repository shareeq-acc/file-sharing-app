
export class FileResponseDto {
    id: string
    originalName: string
    url:string
    fileName: string
    description?: string
    isPublic: boolean
    format: string
    size: number
    uploadedBy: {
        id: string;
        name: string; 
    };
    expiresAt?: Date
    createdAt: Date
}