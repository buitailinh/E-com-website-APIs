import { AppObject } from '../../common/app.object';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/api/users/users.service';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private userService: UsersService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        const request = context.switchToHttp().getRequest();
        console.log(request);

        if (request?.user) {
            const { id } = request.user;
            const user = await this.userService.findOne(id);
            return roles.includes(user.role);
        }
        return false;
    }
}