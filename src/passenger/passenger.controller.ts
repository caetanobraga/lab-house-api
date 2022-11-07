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
import { Passenger } from './passenger.entity';
import { PassengerService } from './passenger.service';

@Controller('passenger')
export class PassengerController {
  constructor(private service: PassengerService) {}

  @Get()
  public async searchPassengers(
    @Query('page') page = 0,
    @Query('size') size = 10,
    @Query('nome') nome: string,
  ) {
    return await this.service.searchPassenger(page, size, nome);
  }

  @Post()
  public async createPassenger(
    @Body() passenger: Passenger,
  ): Promise<NestResponse> {
    const passengerCreated = await this.service.createPassenger(passenger);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/drivers/${passengerCreated.nome}` })
      .withBody(passengerCreated)
      .build();
  }

  @Delete(':passengerCPF')
  @HttpCode(204)
  public async deleteDriver(@Param('passengerCPF') CPF: string) {
    await this.service.deletePassenger(CPF);
  }

  @Get(':passengerCPF')
  public async searchDriversPorCPF(@Param('passengerCPF') CPF: string) {
    return await this.service.getPassengerPorCPF(CPF);
  }

  @Put(':passengerCPF')
  public async updatePassenger(
    @Body() passenger: Passenger,
    @Param('passengerCPF') CPF: string,
  ): Promise<NestResponse> {
    const passengerUpdated = await this.service.updatePassenger(passenger, CPF);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/drivers/${passengerUpdated}` })
      .withBody(passengerUpdated)
      .build();
  }
}
