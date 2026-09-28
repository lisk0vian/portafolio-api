import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ type: [String] })
  stack!: string[];
}
