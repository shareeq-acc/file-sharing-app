import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserEntity } from 'src/user/model/user.entity';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() user: RegisterDto): Promise<UserEntity> {
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() user: LoginDto): Promise<any> {
        return this.authService.login(user);
    }
}