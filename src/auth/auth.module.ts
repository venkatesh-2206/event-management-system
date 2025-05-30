import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'event1',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule
  ],
  providers: [JwtStrategy, AuthResolver, AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule { }