import { ApiProperty } from '@nestjs/swagger';
import { EDITIONS, type Edition } from '../../common/edition.js';

export class EducationDto {
  @ApiProperty()
  school!: string;

  @ApiProperty()
  degree!: string;

  @ApiProperty()
  period!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({
    required: false,
    enum: EDITIONS,
    isArray: true,
    description: 'Editions where it appears; absent means both.',
  })
  editions?: Edition[];
}
