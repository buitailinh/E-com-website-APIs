import { userProvider } from './users.provider';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { UserRepository } from './users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, ...userProvider],
  exports: [UsersService, UserRepository]
})
export class UsersModule { }
