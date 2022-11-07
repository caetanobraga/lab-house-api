import { IsNotEmpty, IsString, MaxLength, IsISO8601 } from 'class-validator';
import { IsValidAge } from 'src/utils/age.validator';
import { IsValidCPF } from 'src/utils/cpf.validator';

export class Passenger {
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
  endereco: string;
}
