import { HttpException, HttpStatus } from "@nestjs/common";

export class UserExistsException extends HttpException {
    constructor(email: string) {
        super({
            statusCode: HttpStatus.CONFLICT,
            error: 'USER_EXISTS',
            message: `User with email ${email} already exists`
        }, HttpStatus.CONFLICT);
    }
}