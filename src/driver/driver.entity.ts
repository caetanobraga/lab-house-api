import { IsNotEmpty, IsString, MaxLength, IsISO8601 } from 'class-validator';
import { IsValidAge, VerifyAge } from 'src/utils/age.validator';
import { IsValidCPF } from 'src/utils/cpf.validator';

export class Driver {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nome: string;

  @IsNotEmpty()
  @IsISO8601()
  @IsValidAge()
  dataNascimento: Date;

  @IsNotEmpty()
  @IsValidCPF()
  CPF: string;

  @IsNotEmpty()
  @IsString()
  placa: string;

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
