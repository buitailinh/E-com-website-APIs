import { UserRepository } from './../../../api/users/users.repository';
import { JwtPayload } from './../jwt-payload.interface';
import { User } from './../../../api/users/entities/user.entity';
import { UsersService } from 'src/api/users/users.service';
import { validate } from 'class-validator';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_CONFIG } from 'src/config/constant.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService,
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONFIG.secret,
        })
    }
    async validate(payload): Promise<User> {
        // const email = payload.payload.email;
        // console.log(payload.payload);
        const user = await this.userService.findOne(payload.payload.id);

        return user;
    }
}