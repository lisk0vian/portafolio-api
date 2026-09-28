import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ParagraphBlockDto {
  @ApiProperty({ enum: ['paragraph'] })
  type!: 'paragraph';

  @ApiProperty()
  text!: string;
}

export class CodeBlockDto {
  @ApiProperty({ enum: ['code'] })
  type!: 'code';

  @ApiProperty({ description: 'Programming language of the snippet.' })
  language!: string;

  @ApiProperty()
  source!: string;

  @ApiProperty({ required: false })
  caption?: string;
}

export class TableBlockDto {
  @ApiProperty({ enum: ['table'] })
  type!: 'table';

  @ApiProperty({ required: false })
  caption?: string;

  @ApiProperty({ type: [String] })
  headers!: string[];

  @ApiProperty({
    type: 'array',
    items: { type: 'array', items: { type: 'string' } },
    description: 'Every row must match headers length.',
  })
  rows!: string[][];
}

export class DiagramBlockDto {
  @ApiProperty({ enum: ['diagram'] })
  type!: 'diagram';

  @ApiProperty({
    enum: ['mermaid', 'image'],
    description: 'mermaid renders source as code; image renders src as <img>.',
  })
  format!: 'mermaid' | 'image';

  @ApiProperty({ required: false, description: 'Diagram code when format is mermaid.' })
  source?: string;

  @ApiProperty({ required: false, description: 'Image URL when format is image.' })
  src?: string;

  @ApiProperty({ required: false })
  alt?: string;

  @ApiProperty({ required: false })
  caption?: string;
}

export class ImageBlockDto {
  @ApiProperty({ enum: ['image'] })
  type!: 'image';

  @ApiProperty()
  src!: string;

  @ApiProperty({ required: false })
  alt?: string;

  @ApiProperty({ required: false })
  caption?: string;
}

export class MetricItemDto {
  @ApiProperty()
  label!: string;

  @ApiProperty()
  value!: string;
}

export class MetricsBlockDto {
  @ApiProperty({ enum: ['metrics'] })
  type!: 'metrics';

  @ApiProperty({ type: [MetricItemDto] })
  items!: MetricItemDto[];
}

export type CaseStudyBlockDto =
  | ParagraphBlockDto
  | CodeBlockDto
  | TableBlockDto
  | DiagramBlockDto
  | ImageBlockDto
  | MetricsBlockDto;

export const CASE_STUDY_BLOCK_TYPES = [
  'paragraph',
  'code',
  'table',
  'diagram',
  'image',
  'metrics',
] as const;

@ApiExtraModels(
  ParagraphBlockDto,
  CodeBlockDto,
  TableBlockDto,
  DiagramBlockDto,
  ImageBlockDto,
  MetricsBlockDto,
)
export class CaseSectionDto {
  @ApiProperty({ description: 'Stable anchor used by the table of contents.' })
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({
    type: 'array',
    description: 'Repeatable content blocks in display order.',
    items: {
      oneOf: [
        { $ref: getSchemaPath(ParagraphBlockDto) },
        { $ref: getSchemaPath(CodeBlockDto) },
        { $ref: getSchemaPath(TableBlockDto) },
        { $ref: getSchemaPath(DiagramBlockDto) },
        { $ref: getSchemaPath(ImageBlockDto) },
        { $ref: getSchemaPath(MetricsBlockDto) },
      ],
    },
  })
  blocks!: CaseStudyBlockDto[];
}

export class CaseStudyMetaDto {
  @ApiProperty()
  label!: string;

  @ApiProperty()
  value!: string;
}

export class CoverImageDto {
  @ApiProperty()
  src!: string;

  @ApiProperty({ required: false })
  alt?: string;

  @ApiProperty({ required: false })
  caption?: string;
}

export class CaseStudyDto {
  @ApiProperty({ description: 'Stable identifier, identical in every language.' })
  slug!: string;

  @ApiProperty({ description: 'Slug of the related project, if any.' })
  projectSlug!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  deck!: string;

  @ApiProperty({ type: [CaseStudyMetaDto] })
  meta!: CaseStudyMetaDto[];

  @ApiProperty()
  coverImage!: CoverImageDto;

  @ApiProperty({ type: [String] })
  tags!: string[];

  @ApiProperty({ description: 'Publication date in YYYY-MM format.' })
  publishedAt!: string;

  @ApiProperty({ type: [CaseSectionDto] })
  sections!: CaseSectionDto[];

  @ApiProperty({ required: false })
  quote?: string;

  @ApiProperty({ required: false })
  nextCaseSlug?: string;
}

export class CaseStudiesQueryDto {
  @ApiProperty({ required: false, description: 'Matches title and deck.' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, description: 'Exact slug of the related project.' })
  @IsOptional()
  @IsString()
  projectSlug?: string;

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
