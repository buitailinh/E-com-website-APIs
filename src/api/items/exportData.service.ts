import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { json2csvAsync } from "json-2-csv";
import keys from "../../../keys.json";
import { convertCSVToArray } from 'convert-csv-to-array';
import { ItemRepository } from "./items.repository";

@Injectable()
export class ExportDataService {
    constructor(private readonly itemRepository: ItemRepository,
    ) { };

    async gsun(client) {
        const data = await json2csvAsync(await this.itemRepository.find());

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

        console.log(arrayData);

        const updateOptions = {
            spreadsheetId: keys.sheep_id,
            range: 'reportItem!A1',
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

    async exportData() {

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

        return await this.gsun(client);
    }
}