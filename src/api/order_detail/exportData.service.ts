import { OrderDetailService } from './order_detail.service';
import { OrderDetail } from './entities/order_detail.entity';
import { Order } from './../order/entities/order.entity';
import { Between, getConnection } from 'typeorm';
import { query } from 'express';
import { OrderDetailRepository } from './order_detail.repository';
import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { json2csvAsync } from "json-2-csv";
import keys from "../../../keys.json";
import { convertCSVToArray } from 'convert-csv-to-array';
import { AppObject } from 'src/share/common/app.object';
import { Item } from '../items/entities/item.entity';
import { ItemRepository } from '../items/items.repository';

@Injectable()
export class ExportDataService {
    constructor(private readonly OrderDetailRepository: OrderDetailRepository,
        private readonly OrderDetailService: OrderDetailService,
        private readonly itemRepository: ItemRepository,

    ) { };

    async gsun(client, query) {
        const dateFirst = query.date1 || new Date('2022-01-01');

        const dateSecond = query.date2 || new Date();
        let arr = [];
        let total = 0;
        let quantity = 0;

        const data1 = await this.OrderDetailRepository.findAndOptions({
            where: {
                createdAt: Between(dateFirst, dateSecond),
            }
        });
        // console.log(data1);
        const data2 = await data1[0].map(async (item) => {
            const orderDetail = await this.OrderDetailService.findOne(item.id);
            const result = await this.getItemForReport(orderDetail.id, orderDetail.item.id);
            if (result) {

                arr.push(result);
                total += result.order_detail_price;
                quantity += result.order_detail_quantity;
            }
        })
        await Promise.all(data2);
        const data = await json2csvAsync(arr);

        const gsapi = google.sheets({ version: 'v4', auth: client });
        const metaData = await gsapi.spreadsheets.get({
            auth: client,
            spreadsheetId: keys.sheep_id,
        });
        console.log(metaData.data.spreadsheetUrl);

        let arrayData = convertCSVToArray(data, {
            type: 'array',
            separator: ',',

        });
        arrayData.push([]);
        arrayData.push([`so luong ban: ${quantity}`, `Tong doanh thu ${total}`]);

        console.log(arrayData);

        const updateOptions = {
            spreadsheetId: keys.sheep_id,
            range: 'reportOrder!A1',
            valueInputOption: 'USER_ENTERED',
            resource: { values: arrayData },
        };
        gsapi.spreadsheets.values.update(updateOptions, function (err, response) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(response);

        });


        return { url: metaData.data.spreadsheetUrl };
    }

    async exportData(query) {

        const client = new google.auth.JWT(
            keys.client_email,
            null,
            keys.private_key,
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        client.authorize((err, tokens) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Connected');

        });

        return await this.gsun(client, query);
    }

    async getItemForReport(id: number, itemId: number) {
        const query = await getConnection()
            .createQueryBuilder()
            .select('order_detail')
            .from(Item, 'item')
            .leftJoin('item.order_details', 'order_detail')
            .leftJoin('order_detail.order', 'order')
            .where('item.id = :itemId', { itemId })
            .andWhere('order_detail.id = :id', { id })
            .andWhere('order_detail.itemId = :itemId', { itemId })
            .andWhere('order.status = :status', { status: AppObject.ORDER.STATUS.CONFIRM })
            .execute();

        return query[0];
    }


    async findTop10() {
        const query = await getConnection().query(`
        Select i.id, i.nameItem, SUM(od.quantity) as quantity
        from item  i  left join order_detail od
        on od.itemId = i.id
        group by i.id
        order by  SUM(od.quantity) desc limit 3;
        `)

        return query;
    }

    async gsun1(client) {

        const data = await json2csvAsync(await this.findTop10());

        const gsapi = google.sheets({ version: 'v4', auth: client });
        const metaData = await gsapi.spreadsheets.get({
            auth: client,
            spreadsheetId: keys.sheep_id,
        });
        console.log(metaData.data.spreadsheetUrl);

        let arrayData = convertCSVToArray(data, {
            type: 'array',
            separator: ',',

        });

        const updateOptions = {
            spreadsheetId: keys.sheep_id,
            range: 'top10!A1',
            valueInputOption: 'USER_ENTERED',
            resource: { values: arrayData },
        };
        gsapi.spreadsheets.values.update(updateOptions, function (err, response) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(response);

        });


        return { url: metaData.data.spreadsheetUrl };
    }

    async exportData2() {

        const client = new google.auth.JWT(
            keys.client_email,
            null,
            keys.private_key,
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        client.authorize((err, tokens) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Connected');

        });

        return await this.gsun1(client);
    }
}