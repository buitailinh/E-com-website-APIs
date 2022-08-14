import { confirmEmailLink } from './../../share/utils/utils/confirmEmailLink';
import { sendEmail } from './../../share/utils/utils/sendEmail';
import { AppObject } from 'src/share/common/app.object';
import { AppKey } from './../../share/common/app.key';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, ObjectID } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository,) { };
  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keywork || '';
    // console.log(keyword);
    const data = await this.userRepository.findAndOptions({
      where: { fullname: Like('%' + keyword + '%') },
      order: {
        fullname: query.order,
      },
      take: take,
      skip: skip,
    });

    return await this.userRepository.paginateResponse(data, page, take);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneByCondition({
      where: {
        id,
      }
    });
    if (!user) return null;
    return user;
  }

  async getByName(name: string): Promise<User> {
    const user = await this.userRepository.findOneByCondition({
      where: {
        fullname: name,
      }
    });
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_EXIST });
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneByCondition({
      where: {
        email,
      }
    });
    if (!user) return null;
    return user;
  }

  async getByPhone(phone: string): Promise<User | null> {
    const user = await this.userRepository.findOneByCondition({
      where: {
        phone,
      }
    });
    if (!user) return null;
    return user;
  }

  async create(createUserDto: CreateUserDto, file?: string) {
    const { email, phone, password, ...data } = createUserDto;
    const emailUser = await this.getByEmail(email);
    if (emailUser) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_EMAIL_EXIST });
    const phoneUser = await this.getByPhone(phone);
    if (phoneUser) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_PHONE_EXIST });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = {
      email,
      phone,
      password: hashPassword,
      avatar: file,
      ...data,
    }
    return await this.userRepository.create(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto, file?: string) {
    const userFound = await this.findOne(id);

    const { phone, ...data } = updateUserDto;
    console.log(data)
    const phoneUser = await this.getByPhone(phone);
    if (phoneUser && userFound.phone !== phoneUser.phone) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_PHONE_EXIST });

    const user = {
      phone,
      avatar: file,
      ...data,
    }
    // const userUpdate = Object.assign(userFound, user);
    await this.userRepository.update(id, user);

    return { message: `Update successfully id ${id}` }
  }

  async remove(ids: number[]) {
    // console.log(ids.length);
    if (ids.length) {
      let userNotExit: number[] = [];
      for (const id of ids) {
        // console.log(id);
        const user = await this.findOne(id);
        // console.log(user);
        if (!user) await userNotExit.push(id);
        else {
          if (user.avatar) {
            const link = `./images/Profile/${user.avatar}`;
            fs.unlinkSync(link)
          }
        }

        await this.userRepository.delete(id);
      }
      if (userNotExit) return { message: `users not exit ${userNotExit}` }
    }

    return { message: `This action removes  users` };
  }
}
