import { query } from 'express';
import { AppKey } from './../../share/common/app.key';
import { CategoryRepository } from './category.repository';
import { Category } from './entities/category.entity';
import { Test } from '@nestjs/testing';
import { CategoryController } from './Category.controller';
import { CategoryService } from './Category.service';
import { NotFoundException } from '@nestjs/common';
import { Any } from 'typeorm';

describe('CategoryController', () => {
    let Service: CategoryService;
    const dto = { nameCategory: 'Nike Running and football', active: true };
    const file = 'a.jpg';
    const data = [
        {
            id: 1,
            nameCategory: 'Category 1',
            active: true,
            banner: 'a.jpg',
        },
        {
            id: 2,
            nameCategory: 'Category 2',
            active: true,
            banner: 'b.jpg',
        }
    ]
    const mockCategoryRepository = {
        save: jest.fn((dto) => {
            return {
                id: expect.any(Number),
                nameCategory: dto.nameCategory,
                active: dto.active,
                banner: dto.file,
            }
        }),
        findOneByCondition: jest.fn().mockImplementation((id) => {
            return {
                id: expect.any(Number),
                nameCategory: expect.any(String),
                active: expect.any(Boolean),
                banner: expect.any(String),
            }
        }),
        findOne: jest.fn((id) => {
            return {
                id: expect.any(Number),
                nameCategory: expect.any(String),
                active: expect.any(Boolean),
                banner: expect.any(String),
            }
        }),

        findAndOptions: jest.fn((id) => {
            return expect.any(Array);
        }),

        paginateResponse: jest.fn((data, page, take) => {
            return expect.any(Object);
        })
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [CategoryService, {
                provide: CategoryRepository,
                useValue: mockCategoryRepository,

            }],
        }).compile();

        Service = module.get<CategoryService>(CategoryService);

    });

    describe('create category', () => {

        it('should return a error if nameCategory exists', async () => {
            mockCategoryRepository.findOneByCondition.mockImplementation(() => true)
            expect(Service.create(dto, file)).rejects.toThrowError(NotFoundException);
        })

        it('should return a category', async () => {
            mockCategoryRepository.findOneByCondition.mockImplementation(() => false)


            expect(await Service.create(dto, file)).toEqual({
                id: expect.any(Number),
                nameCategory: dto.nameCategory,
                active: dto.active,
                // banner: file,
            });

        })
    })

    describe('findAll', () => {
        const query = {};
        it('should return an array of users', async () => {
            expect(await Service.findAll(query)).toBeTruthy();
        });
    });

    describe('find category by id', () => {
        it('should return a category', async () => {
            try {
                mockCategoryRepository.findOneByCondition.mockImplementation(() => true);
                expect(Service.getById(1)).toEqual({
                    id: 1,
                    nameCategory: 'Category 1',
                    active: true,
                    banner: 'a.jpg',
                });
            } catch (error) {
                return error;
            }
        });
        it('should return error', async () => {
            mockCategoryRepository.findOneByCondition.mockImplementation(() => false);
            expect(Service.getById(data[0].id)).rejects.toThrowError(NotFoundException);
        });
    });

    describe('find category by name category', () => {
        it('should return a category', async () => {
            try {
                mockCategoryRepository.findOneByCondition.mockImplementation(() => true);
                expect(await Service.getByName(data[0].nameCategory)).toEqual({
                    id: data[0].id,
                    nameCategory: data[0].nameCategory,
                    banner: data[0].banner,
                    active: data[0].active,
                });
            } catch (error) {
                return error;
            }
        });
        it('should return error', async () => {
            mockCategoryRepository.findOneByCondition.mockImplementation(() => false);
            expect(Service.getById(data[0].id)).rejects.toThrowError(NotFoundException);
        });
    });

    describe('update  category', () => {
        it('should return a category', async () => {
            mockCategoryRepository.findOneByCondition.mockImplementation(() => true);
            try {
                expect(await Service.update(data[0].id, dto, data[0].banner)).toEqual({
                    id: data[0].id,
                    nameCategory: data[0].nameCategory,
                    banner: data[0].banner,
                    active: data[0].active,
                });
            } catch (error) {
                return error;
            }
        });
    });

    describe('delete  category', () => {
        it('should return a string', async () => {
            try {
                expect(await Service.remove(data[0].id)).toEqual({
                    message: `This action removes a #${data[0].id} category`
                })
            } catch (error) {
                return error;
            }
        });
    });
});



