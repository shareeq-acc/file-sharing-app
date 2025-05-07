import { IsEmail,  IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password cannot be Empty' })
    @IsString({ message: 'Password must be a string' })
    password:string;
}