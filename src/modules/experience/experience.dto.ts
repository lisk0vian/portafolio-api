import { ApiProperty } from '@nestjs/swagger';
import { EDITIONS, type Edition } from '../../common/edition.js';

export class ExperienceDto {
  @ApiProperty()
  company!: string;

  @ApiProperty()
  role!: string;

  @ApiProperty()
  location!: string;

  @ApiProperty()
  startDate!: string;

  @ApiProperty({ nullable: true })
  endDate!: string | null;

  @ApiProperty()
  current!: boolean;

  @ApiProperty()
  description!: string;

  @ApiProperty({
    required: false,
    type: [String],
    description: 'Measurable achievements for the timeline.',
  })
  wins?: string[];

  @ApiProperty({ type: [String] })
  stack!: string[];

  @ApiProperty({
    required: false,
    enum: EDITIONS,
    isArray: true,
    description: 'Editions where it appears; absent means both.',
  })
  editions?: Edition[];
}
