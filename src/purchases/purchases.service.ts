import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { AuthService } from 'src/auth/auth.service';
import { DrinksService } from 'src/drinks/drinks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from './entities/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchasesService {

  constructor(
    private readonly drinksService: DrinksService,
    private readonly authService: AuthService,

    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { totalPrice, drink_fk, user_fk } = createPurchaseDto;

    const drink = await this.drinksService.getDrinkByName(drink_fk);
    const user = await this.authService.findUser(user_fk);

    const purchase = this.purchaseRepository.create({
      drink_fk: drink,
      user_fk: user,
      total: totalPrice
    })
    
    await this.purchaseRepository.save(purchase)

    return purchase

  }

  findAll() {
    return `This action returns all purchases`;
  }

  findOne(id: string) {
    try {
      return this.purchaseRepository.findOne({ relations: { drink_fk: true, user_fk: true }, where: { id } })
    } catch (error) {
      this.handleErrors(error)
    }
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }

  private handleErrors(error) {
    if (error.status === 400) {
      throw new BadRequestException(error.message)
    }
      throw new InternalServerErrorException(error.message)
    }
  

}
