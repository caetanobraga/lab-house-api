import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Db } from 'src/db/db';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
  constructor(private db: Db) {}

  public async createDriver(driver: Driver): Promise<Driver> {
    const driverExists = await this.getDriverPorCPF(driver.CPF);
    if (driverExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Driver já cadastrado',
      });
    }
    driver.bloqueado = false;
    await this.db.setDriver(driver);
    return driver;
  }

  public async getDriverPorCPF(CPF: string) {
    const drivers = await this.db.getDrivers();
    return drivers.find((driver) => driver.CPF == CPF);
  }

  public async searchDrivers(page, size, nome: string) {
    const initialIndex = parseInt(page) * parseInt(size);
    const finalIndex = initialIndex + parseInt(size);
    const drivers = await this.db.getDrivers();
    if (nome) {
      const nomeParcialAPesquisar = drivers.filter((driver) =>
        driver.nome.toLowerCase().startsWith(nome),
      );
      if (nomeParcialAPesquisar.length > 0) console.log(nomeParcialAPesquisar);
      if (nomeParcialAPesquisar.length > initialIndex) {
        if (nomeParcialAPesquisar.length > finalIndex) {
          return nomeParcialAPesquisar.slice(initialIndex, finalIndex);
        } else {
          return nomeParcialAPesquisar.slice(
            initialIndex,
            nomeParcialAPesquisar.length,
          );
        }
      } else {
        return [];
      }
    }
    if (drivers.length > initialIndex) {
      if (drivers.length > finalIndex) {
        return drivers.slice(initialIndex, finalIndex);
      } else {
        return drivers.slice(initialIndex, drivers.length);
      }
    } else {
      return [];
    }
  }

  public async deleteDriver(CPF: string) {
    const drivers = await this.db.getDrivers();
    const novaLista = drivers.filter((driver) => driver.CPF != CPF);
    const travels = await this.db.getTravels();

    const driverJaFezViagens = travels.find((travel) => travel.CPF === CPF);

    if (driverJaFezViagens) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Driver já fez viagem, não pode ser deletado',
      });
    }

    await this.db.setDrivers(novaLista);
    return 'Item deletado!';
  }

  public async updateDriver(driver: Driver, CPF: string) {
    const drivers = await this.db.getDrivers();
    const cpfExists = drivers.find((driver) => driver.CPF === CPF);
    if (!cpfExists) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Cpf não localizado na base!',
      });
    }
    const novaLista = drivers.filter((item) => item.CPF != CPF);
    driver.bloqueado = false;
    novaLista.push(driver);
    await this.db.setDrivers(novaLista);
    return novaLista;
  }

  public async toggleDriver(CPF: string) {
    const drivers = await this.db.getDrivers();
    const driverToggled = drivers.find((driver) => driver.CPF === CPF);
    const toggle = !driverToggled.bloqueado;
    const newDriverToggled = { ...driverToggled, bloqueado: toggle };
    const novaLista = drivers.filter(
      (driver) => driver.CPF != driverToggled.CPF,
    );
    novaLista.push(newDriverToggled);
    await this.db.setDrivers(novaLista);
    return newDriverToggled;
  }
}
