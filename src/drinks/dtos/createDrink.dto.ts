import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateDrinkDto {

    @IsString()
    name: string;

    @IsNumber()
    ounces: number;

    @IsArray()
    aditions: string[];

}