import { ConfigModule } from '@nestjs/config';
import { SessionSerializer } from './serializer/session.serializer';
import { jwtConfig } from './../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/config/constant.config';
import { UsersModule } from 'src/api/users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule,  //.register({ session: true })
    JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy]   //SessionSerializer
})
export class AuthModule { }
