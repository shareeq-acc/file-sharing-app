import { Module } from '@nestjs/common';
import { FileController } from './controller/capsule.controller';
import { FileService } from './service/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapsuleEntity } from './model/capsule.entity';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CapsuleEntity]), 
    StorageModule
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
