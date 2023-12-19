import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { BookEntity } from "./book.entity";

@Entity()
export class UserEntity{
   @PrimaryGeneratedColumn('increment')
   id: number;
   @Column()
   name:string
   @Column()
   email:string
   @Column()
   password:string
   @OneToMany(type => BookEntity, book => book.user, { cascade: true })
   public books: BookEntity[];
}