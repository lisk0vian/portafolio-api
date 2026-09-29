import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CertificationDto {
  @ApiProperty({
    description: 'Stable identifier, identical in every language.',
  })
  slug!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  issuer!: string;

  @ApiProperty()
  category!: string;

  @ApiProperty({
    type: [String],
    description: 'Grouping labels (e.g. aws, cloud). Stable across languages.',
  })
  tags!: string[];

  @ApiProperty({ description: 'Issue date in YYYY-MM format.' })
  issueDate!: string;

  @ApiProperty({
    required: false,
    nullable: true,
    description: 'Expiry date in YYYY-MM format. Absent means no expiry.',
  })
  expiryDate?: string | null;

  @ApiProperty({ required: false })
  credentialId?: string;

  @ApiProperty({ required: false })
  credentialUrl?: string;

  @ApiProperty({
    type: [String],
    description: 'Related skill names, matching the skills section.',
  })
  skills!: string[];

  @ApiProperty({
    required: false,
    description: "Level label, e.g. Associate. Absent when the issuer has none.",
  })
  level?: string;

  @ApiProperty()
  featured!: boolean;
}

export class CertificationLatestDto {
  @ApiProperty()
  title!: string;

  @ApiProperty({ required: false })
  level?: string;

  @ApiProperty({ description: 'Year derived from issueDate.' })
  year!: number;
}

export class CertificationGroupDto {
  @ApiProperty({
    description: 'Group slug, derived from tags. Stable across languages.',
  })
  group!: string;

  @ApiProperty({ description: 'Number of certifications in this group.' })
  count!: number;

  @ApiProperty({ type: CertificationLatestDto })
  latest!: CertificationLatestDto;

  @ApiProperty({ description: 'Earliest issue year in this group.' })
  fromYear!: number;

  @ApiProperty({ description: 'Latest issue year in this group.' })
  toYear!: number;
}

export class CertificationsQueryDto {
  @ApiProperty({ required: false, description: 'Matches title and issuer.' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  issuer?: string;

  @ApiProperty({
    required: false,
    description: 'Matches items inside the skills array.',
  })
  @IsOptional()
  @IsString()
  skill?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    required: false,
    description: 'Comma-separated tags, matched with OR logic.',
  })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiProperty({
    required: false,
    description:
      'Single group slug, matched against tags (e.g. group=aws). Use tag for multiple values.',
  })
  @IsOptional()
  @IsString()
  group?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBooleanString()
  featured?: string;

  @ApiProperty({
    required: false,
    description: 'Filter by expiry status, computed from expiryDate.',
  })
  @IsOptional()
  @IsBooleanString()
  expired?: string;

  @ApiProperty({
    required: false,
    description:
      'Sparse response, e.g. fields=slug,title. slug is always included.',
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

  @ApiProperty({
    required: false,
    default: 0,
    description: 'Number of items to skip, for pagination with limit.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
