import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthService } from "./auth.service";
import { JwtStrategy } from "./auth.strategy";

@Module({imports: [
    JwtModule.register({
      secret:process.env.SECREAT_KEY, // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    // Other modules and imports...
  ],

 providers:[JwtStrategy,JwtAuthService],
 controllers:[],
 exports:[JwtStrategy,JwtAuthService]
})
export class AuthModule{

}