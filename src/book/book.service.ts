import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/Entity/book.entity";
import { CachStoreModule } from "src/cachstore/cachstore.module";
import { Repository } from "typeorm";

Injectable()
export class BookService {

    constructor(@InjectRepository(BookEntity) 
    private readonly bookRepository:Repository<BookEntity>) {}

    public getBooks():Promise<[BookEntity[], number]>{        
        return this.bookRepository.findAndCount({relations: ['user']})
       }

    public getNameID(id:any):Promise<BookEntity[]>{
        return this.bookRepository.find({where:{id},
             relations: ['user'] })
       }

    public addBook(bookData:any):Promise<BookEntity[] | null>{
        return this.bookRepository.save(bookData)
    }
}