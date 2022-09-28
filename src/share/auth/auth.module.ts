import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { DatabaseModule } from '../../config/database/database.module';
import { OtpModule } from './../otp/otp.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from './../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../../config/constant.config';
import { UsersModule } from './../../api/users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { SendmailModule } from '../sendmail/sendmail.module';

@Module({
  imports: [DatabaseModule, UsersModule, PassportModule, OtpModule, ConfigModule,  //.register({ session: true })
    JwtModule.registerAsync(jwtConfig), SendmailModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule { }
