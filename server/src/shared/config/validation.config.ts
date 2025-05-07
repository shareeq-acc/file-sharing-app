import { ValidationPipe, ValidationError, BadRequestException  } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
    transform: true,
    whitelist:true,
    forbidNonWhitelisted: true,
    errorHttpStatusCode: 400,

    exceptionFactory(errors:ValidationError[]){
        const formattedErrors = errors.map(error => ({
            field: error.property,
            errors: Object.values(error.constraints || {}),
        }));

        return new BadRequestException({
            statusCode: 400,
            error: 'VALIDATION_ERROR',
            details:formattedErrors
        })
    }
})