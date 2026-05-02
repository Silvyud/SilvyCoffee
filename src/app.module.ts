import { Module } from '@nestjs/common';
import { DrinksModule } from './drinks/drinks.module';
import { DrinksService } from './drinks/drinks.service';
import { DrinksController } from './drinks/drinks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PurchasesModule } from './purchases/purchases.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    DrinksModule,
    
    PurchasesModule,
    
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
