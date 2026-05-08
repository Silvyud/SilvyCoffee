import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class RegisterUserDto {

    @IsEmail()
    @IsString()
    email: string

    @IsStrongPassword()
    password: string

}