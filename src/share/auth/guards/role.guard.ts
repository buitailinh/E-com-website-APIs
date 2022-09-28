import { AppKey } from './../../common/app.key';
import { AppObject } from '../../common/app.object';
import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../../api/users/users.service';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private userService: UsersService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        const request = context.switchToHttp().getRequest();
        // console.log(request);

        if (request?.user) {
            const { id } = request.user;
            const user = await this.userService.findOne(id);
            if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_ID_NOT_VALID });
            return roles.includes(user.role);
        }
        return false;
    }
}