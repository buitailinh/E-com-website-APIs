// import { UserRepository } from './../users/users.repository';
// import { UsersService } from '../../api/users/users.service';
// import { async } from 'rxjs';
// import { getConnection } from 'typeorm';
// import { query } from 'express';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { CategoryRepository } from './category.repository';
// import { DatabaseModule } from './../../config/database/database.module';
// import { CategoryService } from './category.service';
// import { CategoryController } from './category.controller';
// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersModule } from '../users/users.module';



// describe('CategoryController', () => {
//     let controller: CategoryController;

//     const query = {
//         query: {},
//     } as unknown as any;

//     const mockCategoryService = {

//         create: jest.fn((dto, file) => {
//             return {
//                 id: expect.any(Number),
//                 nameCategory: dto.nameCategory,
//                 active: dto.active,
//                 banner: file.filename
//             }
//         }),

//     };

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [CategoryController],
//             providers: [{      //UsersService, UserRepository,
//                 provide: CategoryService,
//                 useValue: mockCategoryService
//             }],  //, CategoryRepository, ...categoryProvider
//         })
//             .compile();

//         controller = module.get<CategoryController>(CategoryController);

//         // app =
//     });


//     it('should be defined', () => {
//         expect(controller).toBeDefined();
//     });

//     // it('Get data by category', () => {
//     //     const query = {};
//     //     expect(controller.findAll(query));
//     // })


//     // it('should create a category', async () => {
//     //     const dto = { nameCategory: 'Nike Running and football', active: true };
//     //     const file = { filename: 'a.jpg' };
//     //     expect(await controller.create(dto, file)).toEqual({
//     //         id: expect.any(Number),
//     //         // nameCategory: dto.nameCategory,
//     //         // active: dto.active,
//     //         // banner: file.filename,
//     //         // createAt: expect.any(Date),
//     //         // updateAt: expect.any(Date),
//     //         // deleteAt: expect.any(Date),
//     //     });
//     //     // expect(await mockUserService.create).toHaveBeenCalledWith(dto, file);
//     // });

// });
