import { Payment } from './entities/payment.entity';
import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as querystring from 'qs';
import * as crypto from 'crypto';
import { VnpayDto } from './dto/vnpay.dto';

@Injectable()
export class PaymentService {
  constructor(private config: ConfigService) { }


  payment(
    ipAddr: string,
    amount: number,
    bankCode: string,
    orderInfo: string,
    orderType: string,
    locale: string,
  ): string {
    var tmnCode = this.config.get('vnp_TmnCode');
    var secretKey = this.config.get('vnp_HashSecret');
    var vnpUrl = this.config.get('vnp_Url');
    var returnUrl = this.config.get('vnp_ReturnUrl');
    const date = new Date().toISOString().split(new RegExp('[-T:.]'));
    const createDate = date[0] + date[1] + date[2] + date[3] + date[4] + date[5];
    const orderId = date[3] + date[4] + date[5];

    if (locale === null || locale === '') {
      locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = this.sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return vnpUrl;
  };




  vnpayReturn(vnpayDto: VnpayDto): { message: string, code: string } {
    const secureHash = vnpayDto.vnp_SecureHash;

    delete vnpayDto['vnp_SecureHash'];
    delete vnpayDto['vnp_SecureHashType'];

    const vnpayParams = this.sortObject(vnpayDto);
    const secretKey = process.env.vnp_HashSecret;
    const signData = querystring.stringify(vnpayParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      // kiem tra xem du lieu trong db co hop le khong va thong bao ket qua
      return { message: 'success', code: vnpayDto.vnp_ResponseCode };
    } else {
      // return { message: 'Invalid signature', code: '97' };
      // eslint-disable-next-line no-console
      console.log({ message: 'Invalid signature', code: '97' });
      throw new HttpException(
        'Invalid signature',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  vnpayIpn(@Query() dto: VnpayDto): { RspCode: string; Message: string } {
    const secureHash = dto.vnp_SecureHash;

    delete dto['vnp_SecureHash'];
    delete dto['vnp_SecureHashType'];

    const vnpayParams = this.sortObject(dto);
    const secretKey = process.env.vnp_HashSecret;
    const signData = querystring.stringify(vnpayParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      // kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      return { RspCode: '00', Message: 'success' };
    } else {
      return { RspCode: '97', Message: 'Fail checksum' };
    }
  }

  sortObject(obj: object) {
    const sorted = {};
    const str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }

    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
}
