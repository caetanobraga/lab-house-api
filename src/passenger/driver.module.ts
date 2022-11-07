import { Module } from '@nestjs/common';
import { Db } from 'src/db/db';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  controllers: [DriverController],
  providers: [DriverService, Db],
})
export class DriverModule {}
