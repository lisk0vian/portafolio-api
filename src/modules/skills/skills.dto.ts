import { ApiProperty } from '@nestjs/swagger';
import { EDITIONS, type Edition } from '../../common/edition.js';

export class SkillItemDto {
  @ApiProperty()
  name!: string;

  @ApiProperty({ description: 'Years of experience with this skill.' })
  years!: number;

  @ApiProperty({
    description: 'Daily-use skill, shown with a highlighted dot.',
  })
  daily!: boolean;
}

export class SkillGroupDto {
  @ApiProperty()
  category!: string;

  @ApiProperty({ type: [SkillItemDto] })
  items!: SkillItemDto[];

  @ApiProperty({
    required: false,
    enum: EDITIONS,
    isArray: true,
    description: 'Editions where it appears; absent means both.',
  })
  editions?: Edition[];
}
