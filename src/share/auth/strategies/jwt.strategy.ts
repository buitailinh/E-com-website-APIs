import { validate } from 'class-validator';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_CONFIG } from 'src/config/constant.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONFIG.secret,
        })
    }
    async validate(payload: any) {
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role,

        }
    }
}