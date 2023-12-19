import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from "./user.entity";

@Entity()
export class BookEntity{
   
   @PrimaryGeneratedColumn('increment')
   id: number
   @Column()
   name:string
   @Column()
   type:string
   @Column()
   price:string

   @ManyToOne(() => UserEntity, user => user.books)
   public user!: UserEntity;
   
 
}