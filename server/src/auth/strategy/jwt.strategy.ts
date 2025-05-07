import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayloadDto } from "../dto/payload.dto";
import { UserService } from "src/user/service/user.service";
import { UserEntity } from "src/user/model/user.entity";
import { UserNotFoundException } from "src/user/exceptions/user-not-found.exception";
import { Injectable } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService, private userService:UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(payload: TokenPayloadDto) : Promise<UserEntity>{
        const validUser:UserEntity = await this.userService.findById(payload.userId)
        if(!validUser) throw new UserNotFoundException
        return validUser;
    }
} 