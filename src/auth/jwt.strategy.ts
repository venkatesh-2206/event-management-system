import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'event1',
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub };
  //   console.log({ userId: payload.sub });
  // }
  async validate(payload: any) {
    console.log(payload.userId);
    return { userId: payload.userId, username: payload.username };

  }

}