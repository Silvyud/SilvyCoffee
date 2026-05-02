import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseEntity } from './entities/purchase.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        PurchaseEntity
      ])
    ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
