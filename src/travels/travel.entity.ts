import { IsNotEmpty, IsString, MaxLength, IsISO8601 } from 'class-validator';
import { IsValidCPF } from 'src/utils/cpf.validator';

export class Travel {
  id: string;

  status: string;

  driver: string;

  @IsNotEmpty()
  @IsValidCPF()
  CPF: string;

  @IsNotEmpty()
  @IsString()
  origem: string;

  @IsNotEmpty()
  @IsString()
  destino: string;
}
