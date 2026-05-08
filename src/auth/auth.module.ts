import { Module } from '@nestjs/common';
import { UsersController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        UserEntity
      ]),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '2h'}
          }
        }
      })
    ],
  controllers: [UsersController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
