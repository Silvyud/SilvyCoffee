import { Module } from '@nestjs/common';
import { DrinksModule } from './drinks/drinks.module';
import { DrinksService } from './drinks/drinks.service';
import { DrinksController } from './drinks/drinks.controller';

@Module({
  imports: [DrinksModule],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class AppModule {}
