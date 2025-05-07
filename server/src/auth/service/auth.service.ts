// auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserExistsException } from 'src/user/exceptions/user-exists.exception';
import { UserEntity } from 'src/user/model/user.entity';
import { UserService } from 'src/user/service/user.service';
import { TokenPayloadDto } from '../dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {}

    private async generateToken(payload:TokenPayloadDto) : Promise<string> {
        return this.jwtService.signAsync(payload);
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    private async comparePasswords(password: string, hash: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hash);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return false;
        }
    }

    async register(user: RegisterDto): Promise<UserEntity> {
        const existingUser: UserEntity = await this.userService.findByEmail(user.email);
        if(existingUser){
            throw new UserExistsException(user.email);
        }
        
        const hashedPassword = await this.hashPassword(user.password);
        const newUser = new UserEntity();
        newUser.email = user.email;
        newUser.password = hashedPassword;
        newUser.name = user.name;
        newUser.googleId = null;
        return this.userService.create(newUser);
    }

    async login(user: LoginDto): Promise<Object> {
        const existingUser: UserEntity = await this.userService.findByEmail(user.email);
        if(!existingUser){
            throw new InvalidCredentialsException;
        }

        const isValidPassword : boolean = await this.comparePasswords(user.password, existingUser.password);
        if(!isValidPassword){
            throw new InvalidCredentialsException;
        }

        // generate Token
        const token:string = await this.generateToken({userId:existingUser.id});

        return {
            token
        }
    }
}