import { IsNumber, IsPositive, IsString, IsUUID } from "class-validator";

export class CreatePurchaseDto {

    @IsNumber()
    @IsPositive()
    totalPrice: number;

    @IsString()
    drink_fk: string

    @IsUUID()
    user_fk: string

}