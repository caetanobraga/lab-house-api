import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Driver } from 'src/driver/driver.entity';
import { Passenger } from 'src/passenger/passenger.entity';

@Injectable()
export class Db {
  public async getDrivers(): Promise<Driver[]> {
    const driversInFile = await readFile('drivers.json', 'utf-8');
    const drivers = JSON.parse(driversInFile);
    return drivers;
  }

  public async setDriver(driver: Driver) {
    let drivers = await this.getDrivers();
    if (!drivers) {
      drivers = [];
    }
    await writeFile(
      'drivers.json',
      JSON.stringify([...(await this.getDrivers()), driver]),
    );
  }

  public async setDrivers(drivers: Driver[]) {
    await writeFile('drivers.json', JSON.stringify(drivers));
  }

  public async setPassenger(passenger: Passenger) {
    let passengers = await this.getPassengers();
    if (!passengers) {
      passengers = [];
    }
    await writeFile(
      'passengers.json',
      JSON.stringify([...(await this.getPassengers()), passenger]),
    );
  }

  public async getPassengers(): Promise<Passenger[]> {
    const passengersInFile = await readFile('passengers.json', 'utf-8');
    const passengers = JSON.parse(passengersInFile);
    return passengers;
  }

  public async setPassengers(passengers: Passenger[]) {
    await writeFile('passengers.json', JSON.stringify(passengers));
  }
}
