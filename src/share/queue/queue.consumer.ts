import { ItemFlashsaleService } from './../../api/item_flashsale/item_flashsale.service';
import { FlashSaleService } from './../../api/flash_sale/flash_sale.service';
import { Item_FlashSale } from './../../api/flash_sale/dto/create-flash_sale.dto';
import { ItemsService } from './../../api/items/items.service';
import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";
import { eventNames } from 'process';

@Processor('flash-sale')
export class QueueCusumer {
    constructor(private itemService: ItemsService,
        private flashSaleService: FlashSaleService,
        private itemFSService: ItemFlashsaleService,
    ) { }

    @Process('start-fs')
    async startSale(job: Job<any>) {
        const fs = await this.flashSaleService.findOne(job.data.id);
        const items = fs.itemFlashSales;
        await items.map(async (item) => {
            const itemFS = await this.itemFSService.findOne(item.id);
            const result = await this.itemService.getItemWithFS(itemFS.item.id);
            const itemTrue = await this.itemService.updateIsSaleTrue(itemFS.item.id);
            itemTrue.total = result.total;
            await this.itemService.itemRepository.save(itemTrue);
        })
    };

    @Process('end-fs')
    async endSale(job: Job<any>) {
        const fs = await this.flashSaleService.findOne(job.data.id);
        const items = fs.itemFlashSales;
        await items.map(async (item) => {
            const itemFS = await this.itemFSService.findOne(item.id);
            await this.itemService.updateIsSaleFalse(itemFS.item.id);
            // console.log(itemFS);
        })
    };
}