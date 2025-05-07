import { UnauthorizedException } from "@nestjs/common";

export class InvalidCredentialsException extends UnauthorizedException {
    constructor() {
        super({
            statusCode: 401,
            error: 'INVALID_CREDENTIALS',
            message: 'The provided email or password is incorrect'
        });
    }
}