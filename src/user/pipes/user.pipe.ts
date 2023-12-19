import { PipeTransform,ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from "class-transformer";
import { validate } from 'class-validator';

@Injectable()
export class UserPipe implements PipeTransform
{
   async transform(value: any, {metatype}: ArgumentMetadata)  {
        //create obj int class
          const object = plainToInstance(metatype, value);
          //
          const errors :any = await validate(object);
          if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
          }
          return value;
    
}
}