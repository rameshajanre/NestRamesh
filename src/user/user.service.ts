import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {BookService} from '../book/book.service'
import {UserEntity} from '../Entity/user.entity'
import { Repository,DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/user-login.dto';
import * as bcrypt from 'bcryptjs';
import { CachStoreModule } from 'src/cachstore/cachstore.module';


@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) 
  private readonly userRepository:Repository<UserEntity>) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity[] | any>  {
   createUserDto.password = await bcrypt.hash(createUserDto.password,10) 
  //  const newUser= this.userRepository.create(createUserDto)
    return  this.userRepository.save(createUserDto);
  }

 async findAll() : Promise<[UserEntity[],number]>   {
     
  const data = await this.userRepository.findAndCount()

    return data
  }

  async findOne(id: number):Promise<UserEntity[]> {
    const user = await this.userRepository.find({where:{id}});
    return user; 
  }

  async update(id: number, updateUserDto: any): Promise<number> {
    const { affected } = await this.userRepository.update(id, updateUserDto);
    return affected ?? 0;
  }
  
  async remove(id: number):Promise<DeleteResult> {
    return await this.userRepository.delete(id) 
  }

async login(userLogin:LoginUserDto):Promise<UserEntity[]>{
  const user = await this.userRepository.find({where:{email:userLogin.email}});
   if (user) {
      return user
   }
   return null
}

async findByEmail(email:string):Promise<UserEntity[] | null>{
  const user = await this.userRepository.find({where:{email:email}});      
  if (user.length != 0) {
     return user
  }
  return null
}


}
