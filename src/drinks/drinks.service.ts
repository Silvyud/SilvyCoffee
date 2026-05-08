import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDrinkDto } from './dtos/createDrink.dto';
import { DrinksInterface } from './interfaces/drinks.interface';
import { UpdateDrinkDto } from './dtos/updateDrink.dto';
import { DrinksEntity } from './entities/drinks.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';

@Injectable()
export class DrinksService {

    constructor(
        @InjectRepository(DrinksEntity)
        private readonly drinksRepository: Repository<DrinksEntity>,
    ) {}

    private drinks: DrinksInterface[] = [{
            name: "Capuccino",
            ounces: 9,
            aditions: ["Cinammon", "Sugar"],
        },
        {
            name: "Latte",
            ounces: 12,
            aditions: ["Cinammon", "Sugar"],
        },
        {
            name: "Affogato",
            ounces: 6,
            aditions: ["Chocolate syrup", "Caramel"],
        },
        {
            name: "Mocaccino",
            ounces: 9,
            aditions: ["Chantilly", "Chocolate scrapings"],
        },
        {
            name: "Frappe",
            ounces: 12,
            aditions: ["Chantilly", "Chocolate syrup"],
        }]
    
        async getAllDrinks(paginationDto: PaginationDto) {
            const { limit, offset } = paginationDto;
            const drinks = await this.drinksRepository.find({
                skip: offset,
                take: limit
            })
            return drinks
        }
    
        async getDrinkByName(name: string) {
            try{
                const findDrink = await this.drinksRepository.findOneBy({
                    name
                })

                if (!findDrink) {
                    throw new NotFoundException(`The drink with name: ${name} was not found`)
                }

                return findDrink;
                    
            } catch (error) {
                throw new Error(error)
            }
        }
    
        async createDrink(drinkDto: CreateDrinkDto) {
           const newDrink = await this.drinksRepository.create({ ...drinkDto });
           const newDrinkSaved = await this.drinksRepository.save(newDrink);
           console.log(newDrinkSaved);
        }
    
        async updateDrink(name: string, updateDrinkDto: UpdateDrinkDto) {
           try {
            const drinkUpdated = await this.drinksRepository.preload({
                name,
                ...updateDrinkDto
            })

            if (!drinkUpdated) {
                throw new BadRequestException(`The drink with name: ${name} was not found`)
            }

            await this.drinksRepository.save(drinkUpdated)
            return drinkUpdated;

            } catch (error) {
                throw new BadRequestException(`Error updating drink with name: ${name}`)
            }
        }
    
        async deleteDrink(name: string) {
           const drink = await this.getDrinkByName(name);
           await this.drinksRepository.remove(drink);
           return `Has been deleted the drink with name: ${name}`;
        }

}