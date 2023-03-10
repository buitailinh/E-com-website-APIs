import { HttpStatus } from '@nestjs/common';
import { ValidationPipe } from './../pipe/validation.pipe';
/* eslint-disable no-useless-escape */
export const PatternLib = {
  name: /^\w+[A-Za-z\s\d]+$/,
  nameSpecial: /[~!@#$%^&*()-+=<>,?\/\\:;"']/,
  email: /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
  password: /^(?=.*?[_A-Za-z0-9-])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Za-z0-9]).{8,}$/,
  phone: /^(\+?84|0)([23689]|[89])[0-9]{8}$/,
  number: /^\d+$/,
  domainSession: /^https?:\/\/.*?domain.com$/,
  swaggerIgnore: /^https?:\/\/.*?domain.com\/document\/\?url.*$/,
};
