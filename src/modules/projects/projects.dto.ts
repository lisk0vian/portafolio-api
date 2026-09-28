import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProjectLinksDto {
  @ApiProperty({ required: false })
  demo?: string;

  @ApiProperty({ required: false })
  repo?: string;
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

  @ApiProperty({ required: false, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
