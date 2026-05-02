import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dtos/createDrink.dto';
import { UpdateDrinkDto } from './dtos/updateDrink.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';

@Controller('drinks')
export class DrinksController {
  
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  getAllDrinks(
    @Query() paginationDto: PaginationDto
  ) {
    return this.drinksService.getAllDrinks(paginationDto)
  }
  
  @Get(':name')
  getDrinkByName(
    @Param('name') name: string
  ){
    return this.drinksService.getDrinkByName(name);
  }
  
  @Post()
  createDrink(
    @Body() drinkDto: CreateDrinkDto
  ){
    return this.drinksService.createDrink(drinkDto);
  }

  @Patch(':name')
  updateDrink(
    @Param('name') name: string,
    @Body() updateDrinkDto: UpdateDrinkDto
  ){
    return this.drinksService.updateDrink(name, updateDrinkDto);
  }
  
  @Delete(':name')
  deleteDrink(
    @Param('name') name: string
  ){
    return this.drinksService.deleteDrink(name)
  }

}
