import { IsNotEmpty, IsString, MaxLength, IsISO8601 } from 'class-validator';
import { IsValidAge } from 'src/utils/age.validator';
import { IsValidCPF } from 'src/utils/cpf.validator';
import { ApiProperty } from '@nestjs/swagger';

export class Passenger {
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
  endereco: string;
}
