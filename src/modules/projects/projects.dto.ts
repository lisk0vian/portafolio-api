import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EDITIONS, type Edition } from '../../common/edition.js';

export class ProjectLinksDto {
  @ApiProperty({ required: false })
  demo?: string;

  @ApiProperty({ required: false })
  repo?: string;
}

export class ProjectResultDto {
  @ApiProperty({ description: 'Row label, e.g. p95 latency.' })
  label!: string;

  @ApiProperty({ description: 'Value before, e.g. 840 ms.' })
  before!: string;

  @ApiProperty({ description: 'Value after, e.g. 120 ms.' })
  after!: string;
}

export class ProjectDto {
  @ApiProperty()
  slug!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ type: [String] })
  stack!: string[];

  @ApiProperty()
  featured!: boolean;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  links!: ProjectLinksDto;

  @ApiProperty({
    required: false,
    description: 'Headline outcome shown in the work list, e.g. p95 840ms.',
  })
  metric?: string;

  @ApiProperty({
    required: false,
    description: 'Role in the project, e.g. Tech lead.',
  })
  role?: string;

  @ApiProperty({
    required: false,
    description: 'Problem statement shown in the featured block.',
  })
  problem?: string;

  @ApiProperty({
    required: false,
    description: 'Approach summary shown in the featured block.',
  })
  approach?: string;

  @ApiProperty({
    required: false,
    description: 'Outcome sentence shown in the expandable row.',
  })
  result?: string;

  @ApiProperty({
    required: false,
    type: [ProjectResultDto],
    description: 'Before/after table rows.',
  })
  results?: ProjectResultDto[];

  @ApiProperty({
    required: false,
    description:
      'Caption under the before/after table, e.g. measured after three months in production.',
  })
  resultsCaption?: string;

  @ApiProperty({
    required: false,
    enum: EDITIONS,
    isArray: true,
    description: 'Editions where it appears; absent means both.',
  })
  editions?: Edition[];
}

export class ProjectsQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBooleanString()
  featured?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  stack?: string;

  @ApiProperty({
    required: false,
    description:
      'Sparse response, e.g. fields=slug,title,metric. slug is always included.',
  })
  @IsOptional()
  @IsString()
  fields?: string;

  @ApiProperty({ required: false, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
