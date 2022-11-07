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
export class VerifyAge implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const birthDay = moment(value, 'YYYY-MM-DD');
    const now = moment();
    const age = now.diff(birthDay, 'year');
    const minAge = 18;
    if (age < minAge) {
      return false;
    }
    return true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Idade mínima é 18 anos';
  }
}
export function IsValidAge(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidAge',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: VerifyAge,
    });
  };
}
