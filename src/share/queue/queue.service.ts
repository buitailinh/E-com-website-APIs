import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';


@Injectable()
export class QueueService {
  constructor(@InjectQueue('flash-sale') private queue: Queue,
  ) { }

  async sendStart(id, delay) {
    await this.queue.add('start-fs', {
      id,
    }, { delay: delay });

  }

  async sendEnd(id, delay) {
    await this.queue.add('end-fs', {
      id,
    }, { delay: delay });
  }
}
