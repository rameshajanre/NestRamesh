import { Module } from '@nestjs/common';
import { BookController } from './book/book.controlller';
import { BookService } from './book/book.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { DataConnection } from './config/dbConnection.module';
import { JwtModule } from '@nestjs/jwt';
import { CachStoreModule } from './cachstore/cachstore.module';
import { TypeOrmModule } from '@nestjs/typeorm';




@Module({
  imports: [
    JwtModule.register({
      secret: 'demouser', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    UserModule,BookModule,DataConnection,CachStoreModule,
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
 
}
