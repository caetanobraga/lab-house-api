import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Db } from 'src/db/db';
import { Passenger } from './passenger.entity';

@Injectable()
export class PassengerService {
  constructor(private db: Db) {}

  public async createPassenger(passenger: Passenger): Promise<Passenger> {
    const passengerExists = await this.getPassengerPorCPF(passenger.CPF);
    if (passengerExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Passageiro já cadastrado',
      });
    }
    await this.db.setPassenger(passenger);
    return passenger;
  }

  public async getPassengerPorCPF(CPF: string) {
    const passengers = await this.db.getPassengers();
    const passengerFound = passengers.find((passenger) => passenger.CPF == CPF);
    if (passengerFound) return passengerFound;
  }

  public async searchPassenger(page, size, nome: string) {
    const initialIndex = parseInt(page) * parseInt(size);
    const finalIndex = initialIndex + parseInt(size);
    const passengers = await this.db.getPassengers();
    if (nome) {
      const nomeParcialAPesquisar = passengers.filter((passenger) =>
        passenger.nome.toLowerCase().startsWith(nome),
      );
      //if (nomeParcialAPesquisar.length > 0) console.log(nomeParcialAPesquisar);
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
    if (passengers.length > initialIndex) {
      if (passengers.length > finalIndex) {
        return passengers.slice(initialIndex, finalIndex);
      } else {
        return passengers.slice(initialIndex, passengers.length);
      }
    } else {
      return [];
    }
  }

  public async deletePassenger(CPF: string) {
    const passengers = await this.db.getPassengers();
    const travels = await this.db.getTravels();

    const passangerJaFezViagens = travels.find((travel) => travel.CPF === CPF);

    if (passangerJaFezViagens) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Passageiro já fez viagem, não pode ser deletado',
      });
    }

    const novaLista = passengers.filter((passenger) => passenger.CPF != CPF);
    await this.db.setPassengers(novaLista);
  }

  public async updatePassenger(passenger: Passenger, CPF: string) {
    const passengers = await this.db.getPassengers();
    const cpfExists = passengers.find((passenger) => passenger.CPF === CPF);
    if (!cpfExists) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Cpf não localizado na base!',
      });
    }
    const novaLista = passengers.filter((item) => item.CPF != CPF);
    novaLista.push(passenger);
    await this.db.setPassengers(novaLista);
    return novaLista;
  }
}
