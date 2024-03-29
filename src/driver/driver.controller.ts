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
  Patch,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';

@ApiTags('drivers')
@Controller('drivers')
export class DriverController {
  constructor(private service: DriverService) {}

  @Get()
  public async searchDrivers(
    @Query('page') page = 0,
    @Query('size') size = 10,
    @Query('nome') nome: string,
  ) {
    return await this.service.searchDrivers(page, size, nome);
  }

  @Post()
  public async createDriver(@Body() driver: Driver): Promise<NestResponse> {
    const driverCreated = await this.service.createDriver(driver);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/drivers/${driverCreated.nome}` })
      .withBody(driverCreated)
      .build();
  }

  @Delete(':driverCPF')
  @HttpCode(204)
  public async deleteDriver(@Param('driverCPF') CPF: string) {
    await this.service.deleteDriver(CPF);
  }

  @Get(':driverCPF')
  public async searchDriversPorCPF(@Param('driverCPF') CPF: string) {
    return await this.service.getDriverPorCPF(CPF);
  }

  @Put(':driverCPF')
  public async updateDriver(
    @Body() driver: Driver,
    @Param('driverCPF') CPF: string,
  ): Promise<NestResponse> {
    const driverUpdated = await this.service.updateDriver(driver, CPF);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/drivers/${driverUpdated}` })
      .withBody(driverUpdated)
      .build();
  }

  @Patch(':driverCPF')
  public async toggleDriver(
    @Param('driverCPF') CPF: string,
  ): Promise<NestResponse> {
    const driverToggled = await this.service.toggleDriver(CPF);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/drivers/${driverToggled}` })
      .withBody(driverToggled)
      .build();
  }
}
