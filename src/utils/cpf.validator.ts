import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class VerifyCPF implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    if (!value) return false;
    let soma: number;
    let resto: number;
    soma = 0;
    if (value == '00000000000') return false;
    for (let i = 1; i <= 9; i++)
      soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(value.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(value.substring(10, 11))) return false;
    return true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'CPF nválido';
  }
}
export function IsValidCPF(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: VerifyCPF,
    });
  };
}
