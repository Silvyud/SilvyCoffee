import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsPositive()
    @IsInt()
    @IsOptional()
    limit: number = 10;

    @IsOptional()
    @IsInt()
    @Min(0)
    offset: number = 0;
}