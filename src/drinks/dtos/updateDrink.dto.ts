import { PartialType } from "@nestjs/mapped-types";
import { CreateDrinkDto } from "./createDrink.dto";

export class UpdateDrinkDto extends PartialType(CreateDrinkDto) {}