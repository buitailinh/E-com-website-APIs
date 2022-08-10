/*
https://docs.nestjs.com/modules
*/
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [],
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})
export class DatabaseModule { }
