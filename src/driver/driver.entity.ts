import { IsNotEmpty, IsString, MaxLength, IsISO8601 } from 'class-validator';
import { IsValidAge, VerifyAge } from 'src/utils/age.validator';
import { IsValidCPF } from 'src/utils/cpf.validator';
import { ApiProperty } from '@nestjs/swagger';

export class Driver {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  @IsValidAge()
  dataNascimento: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsValidCPF()
  CPF: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  placa: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  modelo: string;

  bloqueado: boolean;
}

// ii.	Data de Nascimento: No mínimo 18 anos
// iii.	CPF: Deverá ser um CPF válido.
// iv.	Placa: Placa do carro
// v.	Modelo: Modelo do veículo

// i.	Nome: Não pode ser nulo, e no máximo 50 caracteres
