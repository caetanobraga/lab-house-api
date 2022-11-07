import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { Db } from './db/db';
import { DriverModule } from './driver/driver.module';
import { PassengerModule } from './passenger/passenger.module';

@Module({
  imports: [DriverModule, PassengerModule],
  controllers: [],
  providers: [
    Db,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
