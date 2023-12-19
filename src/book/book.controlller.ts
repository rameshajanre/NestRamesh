import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { BookService } from "./book.service";
import { UserService } from "src/user/user.service";
import { BookEntity } from "src/Entity/book.entity";
import { JwtAuthGuard } from '../guard/jwtTokenAuth.guard';


@Controller('book')
export class BookController {
constructor(
    private bookService:BookService,
    private readonly userService:UserService
    ){}
@UseGuards(JwtAuthGuard)
@Post('/addBook')
public async addBook(@Body() booKData:any){
    try{
     const user1 =  await this.userService.findOne(booKData.id)
     const bookObj = new BookEntity()
     bookObj.name=booKData.name
     bookObj.price=booKData.price
     bookObj.type=booKData.type,
    [bookObj.user] = user1 
   return  this.bookService.addBook(bookObj)
    }catch(error:any){
      return error
    }
}
    @UseGuards(JwtAuthGuard)
    @Get ('/getBooks')
    public getBooks():Promise<[BookEntity[], number]>{
     return this.bookService.getBooks()
    }
    @UseGuards(JwtAuthGuard)
    @Get ('/getBookId/:id')
    public getUserId(@Param() params):Promise<BookEntity[]>{
     return this.bookService.getNameID(params.id)
    }

}