import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { RoundsSalt } from './enums/rounds.enum';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  async registerUser(registerUserDto: RegisterUserDto) {
    const {email, password} = registerUserDto

    const salt = bcrypt.genSaltSync(RoundsSalt.ROUNDS10)


    const user = this.userRepository.create({
      email,
      password: bcrypt.hashSync(password, salt)
      // role: Roles.USER
    })

    try {
      await this.userRepository.save(user)
      return user
    } catch (error) {
      this.handleErrors(error)
    }

  }

  loginUser(loginUserDto: LoginUserDto) {

  }

  private handleErrors(error) {
    if (error.status === 400) {
      throw new BadRequestException(error.message)
    }
    throw new InternalServerErrorException(error.message)
  }
}
