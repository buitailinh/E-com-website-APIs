import { AppKey } from './../../common/app.key';
import { UserRepository } from './../../../api/users/users.repository';
import { JwtPayload } from './../jwt-payload.interface';
import { User } from './../../../api/users/entities/user.entity';
import { UsersService } from 'src/api/users/users.service';
import { validate } from 'class-validator';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_CONFIG } from 'src/config/constant.config';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
// JwtStrategy.extractJWT,
// ExtractJwt.fromAuthHeaderAsBearerToken(),

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly userService: UsersService,
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.Authentication;
                }]),
            ignoreExpiration: false,
            secretOrKey: JWT_CONFIG.secret,
        })
    }

    async validate(payload): Promise<User> {
        // const email = payload.payload.email;
        // console.log(payload.payload);
        const user = await this.userService.findOne(payload.payload.id);
        if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_ID_NOT_VALID });
        return user;
    }
}