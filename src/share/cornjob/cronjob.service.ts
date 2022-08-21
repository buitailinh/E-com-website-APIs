import { sendEmail } from '../utils/utils/sendEmail';
import { SendmailService } from '../sendmail/sendmail.service';
import { FlashSaleService } from '../../api/flash_sale/flash_sale.service';
import { ItemsService } from '../../api/items/items.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';


@Injectable()
export class CronjobService {
  private readonly logger = new Logger(CronjobService.name);
  constructor(
    private itemService: ItemsService,
    private flashSaleService: FlashSaleService,
    private sendEmailService: SendmailService,
  ) { }

  @Cron('* * * * *', {
    name: 'checkIsSaleItems',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async checkFSOfItems() {
    const item = await this.itemService.itemRepository.find();
    const itemFS = await item.map(async (item) => {
      const result = await this.itemService.getItemWithFS(item.id);
      if (result) {
        // this.logger.debug(`true: ${item.id}`);
        await this.itemService.updateIsSaleTrue(item.id);
      } else {
        // this.logger.debug(` false ${item.id}`);
        await this.itemService.updateIsSaleFalse(item.id);
      }
    });
    await Promise.all(itemFS);
  }


  @Cron('* * * * *', {
    name: 'checkFSOfItems',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async sendEmailNotification() {
    try {
      const timeNow = new Date().setSeconds(0, 0);
      const flashsale = await this.flashSaleService.flashSaleRepository.find();
      await flashsale.map(async (flashsale) => {
        const timeStartBefore15min = new Date(
          new Date(flashsale.timeStart).getTime() - 5 * 60 * 1000,
        ).getTime();
        if (timeNow === timeStartBefore15min) {
          this.logger.debug('Send email notification');
          await this.sendEmailService.sendNotification(flashsale);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

}
