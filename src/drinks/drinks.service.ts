import { Injectable } from '@nestjs/common';
import { CreateDrinkDto } from './dtos/createDrink.dto';
import { DrinksInterface } from './interfaces/drinks.interface';
import { UpdateDrinkDto } from './dtos/updateDrink.dto';

@Injectable()
export class DrinksService {

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
    
        getAllDrinks() {
            return this.drinks
        }
    
        getDrinkByName(name: string) {
            const find = this.drinks.find((drink) => {
                if(drink.name === name) return drink
            })
    
            if (!find) {
                return null
            }
            
            return find;
        }
    
        createDrink(drinkDto: CreateDrinkDto) {
            this.drinks.push({
                name: drinkDto.name,
                ounces: drinkDto.ounces,
                aditions: drinkDto.aditions,
            })
        }
    
        updateDrink(name: string, updateDrinkDto: UpdateDrinkDto) {
            let foundDrink: DrinksInterface | null = this.getDrinkByName(name);
    
            if (!foundDrink) {
                return { message: `La bebida con el nombre ${name} no fue encontrada`}
            }
            
            let indexToChange: number = 0;
            this.drinks.find((drink, index) => {
                if (drink.name === name) {
                    indexToChange = index;
                }
            });
    
            this.drinks[indexToChange] = {
                ...foundDrink,
                ...updateDrinkDto
            }
    
            return this.drinks[indexToChange];
    
        }
    
        deleteDrink(name: string) {
            let foundDrink: DrinksInterface | null = this.getDrinkByName(name);
    
            if (!foundDrink) {
                return { message: `La bebida con el nombre ${name} no fue encontrada`}
            }
    
            let indexToDelete: number = 0;
            this.drinks.find((drink, index) => {
                if (drink.name === name) {
                    indexToDelete = index;
                }
            });
    
            this.drinks.forEach((drink, index) => {
                if (index > indexToDelete) this.drinks[index - 1] = drink
            })
    
        }

}