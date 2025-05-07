import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileService } from '../service/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileResponseDto } from '../dto/file-response.dto';
import { CreateCapsuleDto } from '../dto/create-capsule.dto';
import { Auth, AuthType } from 'src/auth/decorator/auth-type.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateFileDto } from '../dto/update-file.dto';
import { BASE_ENDPOINT } from 'src/capsule/constants/capsule.constants';
import { memoryStorage } from 'multer';

@Controller(BASE_ENDPOINT)
export class FileController {
    constructor(private fileService:FileService){}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
          storage: memoryStorage(),
        }),
      )
    @Auth(AuthType.STRICT)
    @UseGuards(JwtAuthGuard)
    async upload(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() fileData:CreateCapsuleDto): Promise<FileResponseDto> {
        return this.fileService.registerFile(file, fileData, req.user.id);
    }

    @Get(":id")
    @Auth(AuthType.OPTIONAL)
    @UseGuards(JwtAuthGuard)
    async getFile(@Param("id") id:string, @Req() req) : Promise<FileResponseDto>{
        const userId = req?.user?.id || ""
        return this.fileService.getFileDetails(id, userId);
    }

    @Get()
    async getAll() : Promise<FileResponseDto[]>{
        return this.fileService.getAll(); 
    }

    @Put(":id")
    @Auth(AuthType.STRICT)
    @UseGuards(JwtAuthGuard)
    async updateFile(@Param("id") id:string, @Body() fileData:UpdateFileDto, @Req() req) : Promise<FileResponseDto>{
        return this.fileService.updateFileInfo(id, fileData, req.user.id);
    }
}

