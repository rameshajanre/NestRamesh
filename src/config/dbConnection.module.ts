import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

console.log(process.env.DB_PASSWORD,"user====>",process.env.DB_USER)

@Module({
    imports: [
        TypeOrmModule.forRoot({
          //type: process.env.TYPE as 'postgres'|'mysql' | 'sqlite' | 'mssql',
          type:'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT) || 5432,
          username: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || '12345',
          database: process.env.BD_NAME || 'usercrud',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true, // Set to false in production,
        },
        ),
      ],
})
export class DataConnection implements OnModuleInit{
    async onModuleInit() {
        try {
         
          console.log('Connected to the database'); // Log a message upon successful connection
        } catch (error) {
          console.error('Error connecting to the database:', error); // Log an error if connection fails
        }
      }
}