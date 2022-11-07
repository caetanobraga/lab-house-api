import { Module } from '@nestjs/common';
import { Db } from 'src/db/db';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService, Db],
})
export class PassengerModule {}
