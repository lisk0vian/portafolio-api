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

export class PublicationDto {
  @ApiProperty({
    description: 'Stable identifier, identical in every language.',
  })
  slug!: string;

  @ApiProperty({
    description: 'Original title, kept untranslated in every language.',
  })
  title!: string;

  @ApiProperty({ type: [String] })
  authors!: string[];

  @ApiProperty({
    description: 'Journal or conference/proceedings name, in its original language.',
  })
  venue!: string;

  @ApiProperty({
    description: "Publication kind: 'journal' or 'conference'.",
    enum: ['journal', 'conference'],
  })
  type!: string;

  @ApiProperty()
  year!: number;

  @ApiProperty({ description: 'Publication date in YYYY-MM format.' })
  publishedAt!: string;

  @ApiProperty({ description: 'DOI landing URL, e.g. https://doi.org/10.0000/x.' })
  doi!: string;

  @ApiProperty({ description: 'Public PDF URL.' })
  pdfUrl!: string;

  @ApiProperty({
    required: false,
    description: 'Extra link (journal page, proceedings, slides).',
  })
  url?: string;

  @ApiProperty({ description: 'Abstract, translated to the response language.' })
  abstract!: string;

  @ApiProperty({
    type: [String],
    description: 'Keywords. Stable across languages.',
  })
  keywords!: string[];

  @ApiProperty()
  featured!: boolean;

  @ApiProperty({
    required: false,
    description:
      'Side-card reference, e.g. Vol. 12 · pp. 45–67.',
  })
  pages?: string;

  @ApiProperty({
    required: false,
    description: 'Article language, already translated.',
  })
  language?: string;
}

export class PublicationsQueryDto {
  @ApiProperty({
    required: false,
    description: "Exact match, case-insensitive: 'journal' or 'conference'.",
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2100)
  year?: number;

  @ApiProperty({
    required: false,
    description: 'Matches title, venue and abstract.',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    required: false,
    description: 'Comma-separated keywords, matched with OR logic.',
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
