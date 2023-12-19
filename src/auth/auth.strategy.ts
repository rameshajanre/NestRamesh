import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:process.env.SECREAT_KEY, // Replace with your actual secret key
    });
  }

  async validate(payload: any): Promise<any> {    
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload; // Return the authenticated user
  }
}
