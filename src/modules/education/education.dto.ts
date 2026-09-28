import { ApiProperty } from '@nestjs/swagger';

export class EducationDto {
  @ApiProperty()
  school!: string;

  @ApiProperty()
  degree!: string;

  @ApiProperty()
  period!: string;

  @ApiProperty()
  description!: string;
}
