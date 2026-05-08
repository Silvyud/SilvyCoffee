import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { RoundsSalt } from './enums/rounds.enum';
import { isUUID } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { JwtPlayload } from './interfaces/jwtPlayload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
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

  async loginUser(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto
    const userFind = await this.userRepository.findOne({
      where: {email},
      select: { email: true, password: true, user_id: true }
    })

    if (!userFind) {
      throw new NotFoundException(`User with email: ${email} was not found`)
    }

    if (!bcrypt.compareSync(password, userFind.password)) {
      throw new UnauthorizedException(`Invalid credentials`)
    }
    return {
      user: {
        email: userFind.email,
        id: userFind.user_id
      },
      token: this.getJwtToken({ 
        email: userFind.email,
        id: userFind.user_id
      })
    }

  }

  private getJwtToken(playload: JwtPlayload) {
    return this.jwtService.sign(playload)
  }

  async findUser(term: string) {

    if (isUUID(term)) {
      const user = await this.userRepository.findOneBy({ user_id: term })
      if (!user) {
        throw new NotFoundException(`User with id: ${term} was not found`)
      }
      return user
    }
    const user = await this.userRepository.findOneBy({ email: term })
    if (!user) {
      throw new NotFoundException(`User with email: ${term} was not found`)
    }
    return user

  }

  private handleErrors(error) {
    if (error.status === 400) {
      throw new BadRequestException(error.message)
    }
    throw new InternalServerErrorException(error.message)
  }
}
