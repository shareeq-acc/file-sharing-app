import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CapsuleEntity } from '../model/capsule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCapsuleDto } from '../dto/create-capsule.dto';
import { FileResponseDto } from '../dto/file-response.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { StorageProviderResponse } from 'src/storage/interfaces/storage-provider-response.interface';
import { StorageService } from 'src/storage/services/storage.service';

@Injectable()
export class FileService {

    constructor(@InjectRepository(CapsuleEntity) private readonly fileRepository: Repository<CapsuleEntity>, private storageService:StorageService ) {}

    async uploadFile(file: Express.Multer.File): Promise<StorageProviderResponse> {
        return this.storageService.uploadFile(file);
    }

    async registerFile(file: Express.Multer.File, fileData: CreateCapsuleDto, userId:string){
        const uploadedFile: StorageProviderResponse = await this.uploadFile(file);
        const CapsuleEntity = this.fileRepository.create({
            originalName: uploadedFile.originalName,
            format: uploadedFile.format,
            size: file.size,
            url: uploadedFile.url,
            publicId: uploadedFile.publicId,
            uploadedBy: { id: userId }, 
            fileName: fileData.fileName,
            description: fileData.description,
            isPublic: fileData.isPublic,
            expiresAt: fileData.expiresAt,
          });
        const savedFile = await this.fileRepository.save(CapsuleEntity);
        return this.getFileDetails(savedFile.id, userId);
    }

    async getFileDetails(fileId: string, userId?:string): Promise<FileResponseDto> {
        try {
            const file = await this.fileRepository.findOne({ 
                where: { id: fileId },
                relations:["uploadedBy"],
                select:{
                    uploadedBy:{
                        id: true,
                        name: true
                    }
                }
            }
            );
            if(!file){
                throw new BadRequestException("File not found");
            }

            if(file.expiresAt && file.expiresAt < new Date() && file.uploadedBy.id !== userId){
                throw new BadRequestException("File Link has Expired!");
            }
            if(!file.isPublic){
                if(file.uploadedBy.id !== userId){
                    throw new BadRequestException("File is Private!");
                }
            }
            return file
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error
            }
            if (error?.name === 'InvalidUUIDError') {
                throw new BadRequestException('Invalid file ID format');
            }
            throw new InternalServerErrorException("Failed to get file details!");
        }
    }

    async getAll(){
        return this.fileRepository.find({
            relations:["uploadedBy"],  
            select:{
                uploadedBy:{
                    id: true,
                    name: true
                }
            }
        });
    }

    async updateFileInfo(fileId:string, file:UpdateFileDto, userId:string) : Promise<FileResponseDto>{
        const existingFile : FileResponseDto = await this.getFileDetails(fileId, userId);
        if(existingFile.uploadedBy.id != userId){
            throw new UnauthorizedException("You cannot delete this Fill, Please Login Again!");
        }
        await this.fileRepository.update({id: existingFile.id}, file);
        return this.getFileDetails(existingFile.id, userId);
    }
}


