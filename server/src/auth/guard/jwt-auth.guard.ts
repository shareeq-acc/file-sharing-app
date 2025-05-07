import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_TYPE_KEY, AuthType } from '../decorator/auth-type.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector:Reflector) {
        super()
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const authType: AuthType = this.reflector.get<AuthType>(AUTH_TYPE_KEY, context.getHandler());
        try {
            const result = await super.canActivate(context); 
            console.log(result)
            return result as boolean;
        } catch (err) {
            if (authType === AuthType.OPTIONAL) {
                return true; 
            }
            throw err;
        }
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        const authType: AuthType = this.reflector.get<AuthType>(AUTH_TYPE_KEY, context.getHandler());
        const request = context.switchToHttp().getRequest();
    
        if (authType === AuthType.OPTIONAL) {
            request.user = user || null; 
            return user || null;
        }
    
        if (err || !user) {
            throw err || new UnauthorizedException("Please Login to Continue");
        }
    
        request.user = user; 
        return user;
    }
    
}