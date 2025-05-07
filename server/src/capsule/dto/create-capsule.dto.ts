import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MinDate } from "class-validator";

export class CreateCapsuleDto{

    @IsString({ message: 'File Name must be a string' })
    @IsNotEmpty({ message: 'Please Enter File Name' })
    fileName:string;

    @IsOptional()
    @IsString({ message: 'File Description must be a string' })
    description?: string;

    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true) // Transform to boolean
    @IsBoolean()
    isPublic? : boolean

    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : null)
    @IsDate()
    @MinDate(new Date(), { 
      message: 'expiresAt must be a future date'
    })
    expiresAt: Date;
}