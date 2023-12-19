import { NestFactory } from '@nestjs/core';
import { AppModule } from './root.module';
import { NextFunction } from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';


function globleMiddleWares(res:Response,req:Request,next:NextFunction){
  next()
}

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  app.use(globleMiddleWares)
  app.useGlobalPipes(new ValidationPipe())  
  await app.listen(process.env.PORT|| 3000);
}
bootstrap();
