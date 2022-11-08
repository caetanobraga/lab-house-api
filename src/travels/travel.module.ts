import { Module } from '@nestjs/common';
import { Db } from 'src/db/db';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';
import { PassengerService } from 'src/passenger/passenger.service';

@Module({
  controllers: [TravelController],
  providers: [TravelService, Db],
})
export class TravelModule {}
