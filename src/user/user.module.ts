import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BookService } from 'src/book/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { JwtAuthService } from 'src/auth/auth.service';
import {AuthModule} from '../auth/auth.module'
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), // This provides the UserEntityRepository
    // Other modules and imports...
    AuthModule 
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {

}
