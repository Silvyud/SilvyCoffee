import { Module } from '@nestjs/common';
import { UsersController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        UserEntity
      ])
    ],
  controllers: [UsersController],
  providers: [AuthService],
})
export class AuthModule {}
