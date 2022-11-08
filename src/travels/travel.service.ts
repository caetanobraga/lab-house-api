import { Injectable, NotFoundException } from '@nestjs/common';

import { Db } from 'src/db/db';
import { Travel } from './travel.entity';
import { v4 as uuidv4 } from 'uuid';
import { TipoStatus } from './tipo-status.enum';

@Injectable()
export class TravelService {
  constructor(private db: Db) {}

  public async createTravel(travel: Travel): Promise<Travel> {
    const passengers = await this.db.getPassengers();
    const passengerExists = passengers.find(
      (passenger) => passenger.CPF === travel.CPF,
    );
    if (passengerExists) {
      travel.id = uuidv4();
      travel.status = TipoStatus.CREATED;
      travel.driver = null;
      await this.db.setTravel(travel);
      return travel;
    } else {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Passageiro inválido',
      });
    }
  }

  public async searchTravels(address: string, CPF: string) {
    const drivers = await this.db.getDrivers();
    const travels = await this.db.getTravels();
    const driverExists = drivers.find((driver) => driver.CPF === CPF);
    const travelPending = travels.find(
      (travel) => travel.status === TipoStatus.CREATED,
    );

    if (!driverExists) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Motorista inválido',
      });
    }

    if (!travelPending) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Sem viagens pendentes!',
      });
    }

    const travelAccepted = {
      ...travelPending,
      status: TipoStatus.ACCEPTED,
      driver: driverExists.CPF,
    };

    const novaLista = travels.filter(
      (travel) => travel.id != travelAccepted.id,
    );

    novaLista.push(travelAccepted);

    await this.db.setTravels(novaLista);
    return novaLista;
  }
}
