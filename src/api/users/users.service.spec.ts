import { UserRepository } from './users.repository';
import { AppObject } from './../../share/common/app.object';
import { AppKey } from './../../share/common/app.key';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NotFoundException, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const user = {
  email: "test@example.com",
  fullname: "test@example.com",
  password: "password",
  phone: "0355555555",
  address: "123 Main St",
}
const file = "a.jpg";
describe('UsersService', () => {
  let service: UsersService;
  const mockUserRepository = {
    save: jest.fn((dto) => {
      Promise.resolve({
        id: expect.any(Number),
        ...dto,
        // password: expect.any(String),
        role: "CLIENT",
        isVerify: false,
      })
    }),

    findOneByCondition: jest.fn().mockImplementation((id) => {
      return Promise<User>
    }),
    // hashPassword: jest.spyOn(bcrypt, 'hash').mockImplementation((password) => password),

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: UserRepository,
        useValue: mockUserRepository,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create user', () => {



    it('should return a error if email exists', async () => {
      mockUserRepository.findOneByCondition.mockImplementation(() => false)
      expect(service.create(user, file)).rejects.toThrowError(HttpException);
    })

    it('should return a user', async () => {
      // mockUserRepository.save.mockImplementation(() => true)
      expect(await service.create(user)).toEqual({
        id: expect.any(Number),
        ...user,
        // password: expect.any(String),
        role: "CLIENT",
        isVerify: false,
      });
    });
  })

});
