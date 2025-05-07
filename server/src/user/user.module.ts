import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';

@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
