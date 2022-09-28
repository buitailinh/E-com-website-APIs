import { ConfigService } from '@nestjs/config';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, BadRequestException } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
    private twilioClient: Twilio;
    constructor(
        private readonly configService: ConfigService
    ) {
        const accountSid = configService.get('TWILIO_ACCOUNT_SID');
        const authToken = configService.get('TWILIO_AUTH_TOKEN');
        this.twilioClient = new Twilio(accountSid, authToken);
    }

    initiatePhoneNumberVerification(phoneNumber: string) {
        const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');
        let phone;
        if (phoneNumber[0] === '0') {
            phone = phoneNumber.replace('0', '+84');
            console.log(phone);
        }
        return this.twilioClient.verify.services(serviceSid)
            .verifications
            .create({ to: phone, channel: 'sms' })
    }

    async confirmPhonePhoneNumber(phoneNumber: string, verificationCode: string) {
        const serviceSid = this.configService.get('TWILIO_SERVICE_SID');
        const result = await this.twilioClient.verify.services(serviceSid)
            .verificationChecks
            .create({ to: phoneNumber, code: verificationCode })

        if (!result.valid || result.status != 'approved') {
            throw new BadRequestException('Wrong code provided');
        }
        return result;
    }
}
