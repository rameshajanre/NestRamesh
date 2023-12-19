import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseFilters, HttpException, BadRequestException, UseGuards, Res, HttpStatus, Sse } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ExceptionHandler } from 'src/CustomErrorHandler/exception.handler';
import { JwtAuthGuard } from '../guard/jwtTokenAuth.guard';
import { JwtAuthService } from "../auth/auth.service";
import { Response } from 'express';
import { Observable, interval, map } from 'rxjs';
import {MessageEvent} from '../interface/message.interface'


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: JwtAuthService
    ) {}

    @Post("/addUser")
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
      try {

        const userEmail = await this.userService.findByEmail(createUserDto.email)
       
        if (userEmail != null) {
          console.log("user if block...");
          return res.status(400).json({
            message:"user already exits..."
          });
        }else{
          await this.userService.create(createUserDto);
          return res.status(HttpStatus.CREATED).json({ status:201, message:"created succeessfully" });
        }
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: "An error occurred while creating the user."
        });
      }
    }

  @Get("/getAllUser")
  findAll() {
    return this.userService.findAll();
  }

  @Get('/getUser/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('/updateUser/:id')
  update(@Param('id') id:number , @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/deleteUser/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

@Post('/login')
async login(@Body() userLogin){
 const user = await this.userService.login(userLogin)
 
  const token = await this.authService.generateToken(userLogin);

    return {user,token}
}


@Sse('sse')
sse(): Observable<MessageEvent> {
  return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
}


}
