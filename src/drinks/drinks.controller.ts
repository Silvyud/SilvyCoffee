import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dtos/createDrink.dto';
import { UpdateDrinkDto } from './dtos/updateDrink.dto';

@Controller('drinks')
export class DrinksController {
  
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  getAllDrinks() {
    return this.drinksService.getAllDrinks()
  }
  
  @Get(':id')
  getDrinkByName(
    @Param('name', ParseUUIDPipe) name: string
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
    @Param('name', ParseUUIDPipe) name: string,
    @Body() updateDrinkDto: UpdateDrinkDto
  ){
    return this.drinksService.updateDrink(name, updateDrinkDto);
  }
  
  @Delete(':name')
  deleteDrink(
    @Param('name', ParseUUIDPipe) name: string
  ){
    return this.drinksService.deleteDrink(name)
  }

}
