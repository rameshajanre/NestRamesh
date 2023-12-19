import { Module, NestModule,MiddlewareConsumer } from "@nestjs/common";
import { BookController } from "./book.controlller";
import { BookService } from "./book.service";
import { BookMiddleWares } from "./book.meddlewares";
import { CachStoreModule } from "../cachstore/cachstore.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "src/Entity/book.entity";
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[  TypeOrmModule.forFeature([BookEntity]), // This provides the UserEntityRepository
    UserModule, 
  ],
    controllers: [BookController],
    providers: [BookService],
  })
export class BookModule implements NestModule {

    configure(consumer:MiddlewareConsumer){
    consumer.apply(BookMiddleWares).forRoutes('user')
 } 
}