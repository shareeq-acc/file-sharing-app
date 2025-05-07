import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './user/model/user.entity';
import { FileModule } from './capsule/capsule.module';
import { CapsuleEntity } from './capsule/model/capsule.entity';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get("DB_HOST"),
        port: +configService.get<number>("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASS"),
        database: configService.get("DB_NAME"),
        entities: [UserEntity, CapsuleEntity],
        synchronize: true,
      }),
    }), 
    UserModule, 
    AuthModule, 
    FileModule, StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
