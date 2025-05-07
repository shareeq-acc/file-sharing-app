import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor(identifier?: string) {
        const message = identifier
            ? `User with identifier "${identifier}" not found`
            : 'User not found';
        
        super({
            statusCode: HttpStatus.NOT_FOUND,
            error: 'USER_NOT_FOUND',
            message,
        }, HttpStatus.NOT_FOUND);
    }
}
