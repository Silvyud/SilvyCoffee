import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseEntity } from './entities/purchase.entity';
import { DrinksModule } from 'src/drinks/drinks.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        PurchaseEntity
      ]),
      DrinksModule,
      AuthModule
    ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
