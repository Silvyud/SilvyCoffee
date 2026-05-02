import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { DrinksEntity } from './entities/drinks.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DrinksEntity
    ])
  ],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class DrinksModule {}
