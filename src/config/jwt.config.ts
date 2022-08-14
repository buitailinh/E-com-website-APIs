import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import { JWT_CONFIG } from "./constant.config";

export const jwtConfig: JwtModuleAsyncOptions = {
    useFactory: () => {
        return {
            secret: JWT_CONFIG.secret,
            signOptions: {
                expiresIn: JWT_CONFIG.expiresIn,
            },
        }
    },
};