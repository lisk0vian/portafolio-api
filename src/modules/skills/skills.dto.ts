import { ApiProperty } from '@nestjs/swagger';

export class SkillGroupDto {
  @ApiProperty()
  category!: string;

  @ApiProperty({ type: [String] })
  items!: string[];
}
