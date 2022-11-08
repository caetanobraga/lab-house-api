import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { IsValidCPF } from 'src/utils/cpf.validator';
import { TipoStatus } from './tipo-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class Travel {
  id: string;

  status: TipoStatus;

  driver: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsValidCPF()
  CPF: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  origem: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  destino: string;
}
