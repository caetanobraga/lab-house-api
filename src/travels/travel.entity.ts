import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { IsValidCPF } from 'src/utils/cpf.validator';
import { TipoStatus } from './tipo-status.enum';

export class Travel {
  id: string;

  status: TipoStatus;

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
