import { UserRepository } from './../../../api/users/users.repository';
import { JWT_CONFIG } from 'src/config/constant.config';
import { User } from './../../../api/users/entities/user.entity';
import { JWT_REFRESH_CONFIG } from './../../../config/constant.config';

import { UsersService } from 'src/api/users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshToken') {
    constructor(private readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {

                    return request?.cookies?.Authentication;
                }]),
            secretOrKey: JWT_CONFIG.secret,
            ignoreExpiration: true,
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: any) {

        const refreshToken = request.cookies?.Refresh;
        if (!refreshToken) throw new BadRequestException('Refresh token');
        // console.log(request);
        return refreshToken;
    }
    // async validate(payload): Promise<User> {
    //     console.log(payload);
    //     const user = await this.userService.findOne(payload.payload.id);
    //     return user;
    // }

    // constructor(private readonly userService: UsersService,
    //     private userRepository: UserRepository,
    // ) {
    //     super({
    //         jwtFromRequest: ExtractJwt.fromExtractors([
    //             (request: Request) => {
    //                 return request?.cookies?.Authentication;
    //             }]),
    //         ignoreExpiration: false,
    //         secretOrKey: JWT_CONFIG.secret,
    //     })
    // }

    // async validate(payload): Promise<User> {
    //     // const email = payload.payload.email;
    //     // console.log(payload.payload);
    //     const user = await this.userService.findOne(payload.payload.id);
    //     return user;
    // }
}