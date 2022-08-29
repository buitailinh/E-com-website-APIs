import { DatabaseModule } from './../../config/database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { userProvider } from './users.provider';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [UsersController],
      providers: [UsersService, UserRepository, ...userProvider],
      exports: [UsersService, UserRepository]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
