import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Travel } from './travel.entity';
import { TravelService } from './travel.service';
import { ApiProperty } from '@nestjs/swagger';

@Controller('travel')
export class TravelController {
  constructor(private service: TravelService) {}

  @ApiProperty()
  @Post()
  public async createTravel(@Body() travel: Travel): Promise<NestResponse> {
    const travelCreated = await this.service.createTravel(travel);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/drivers/${travelCreated}` })
      .withBody(travelCreated)
      .build();
  }

  @ApiProperty()
  @Get(':driverCPF')
  public async searchTravels(
    @Body('driverAddress') address: string,
    @Param('driverCPF') CPF: string,
  ) {
    return await this.service.searchTravels(address, CPF);
  }
}
