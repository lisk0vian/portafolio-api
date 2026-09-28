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
  @ApiProperty({ description: 'Stable identifier, identical in every language.' })
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

  @ApiProperty()
  featured!: boolean;
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
}
