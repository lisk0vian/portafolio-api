import { ApiProperty } from '@nestjs/swagger';

export class SocialDto {
  @ApiProperty()
  label!: string;

  @ApiProperty()
  url!: string;

  @ApiProperty({
    required: false,
    description: 'Public handle, e.g. @your-user.',
  })
  handle?: string;

  @ApiProperty({
    required: false,
    description: 'Directory line under each profile, matched by label.',
  })
  note?: string;
}

export class AboutNoteDto {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty()
  text!: string;
}

export class FactDto {
  @ApiProperty({ description: 'Fact label, e.g. Based in.' })
  label!: string;

  @ApiProperty({ description: 'Fact value, e.g. Lima, Peru.' })
  value!: string;
}

export class PrincipleDto {
  @ApiProperty({ description: 'Principle title.' })
  title!: string;

  @ApiProperty({ description: 'Principle text.' })
  text!: string;
}

export class NowItemDto {
  @ApiProperty()
  label!: string;

  @ApiProperty()
  value!: string;
}

export class NowDto {
  @ApiProperty({
    description: 'Last update in YYYY-MM format. Language-neutral.',
  })
  updatedAt!: string;

  @ApiProperty({ type: [NowItemDto] })
  items!: NowItemDto[];
}

export class HeadlineDto {
  @ApiProperty({ description: 'Hero headline part before the emphasis.' })
  before!: string;

  @ApiProperty({ description: 'Emphasized part of the hero headline.' })
  emphasis!: string;

  @ApiProperty({ description: 'Hero headline part after the emphasis.' })
  after!: string;
}

export class ProfileEditionDto {
  @ApiProperty({ required: false })
  role?: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false, type: [String] })
  about?: string[];

  @ApiProperty({ required: false, type: [AboutNoteDto] })
  notes?: AboutNoteDto[];

  @ApiProperty({ required: false })
  letter?: string;

  @ApiProperty({ required: false })
  quote?: string;

  @ApiProperty({ required: false })
  quoteSource?: string;

  @ApiProperty({ required: false, type: [PrincipleDto] })
  principles?: PrincipleDto[];

  @ApiProperty({ required: false, type: NowDto })
  now?: NowDto;

  @ApiProperty({ required: false, type: HeadlineDto })
  headline?: HeadlineDto;
}

export class ProfileEditionsDto {
  @ApiProperty({ required: false, type: ProfileEditionDto })
  fullstack?: ProfileEditionDto;

  @ApiProperty({ required: false, type: ProfileEditionDto })
  data?: ProfileEditionDto;
}

export class ProfileDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  role!: string;

  @ApiProperty()
  tagline!: string;

  @ApiProperty()
  bio!: string;

  @ApiProperty()
  location!: string;

  @ApiProperty()
  availability!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ type: [SocialDto] })
  socials!: SocialDto[];

  @ApiProperty({
    required: false,
    type: [String],
    description: 'About paragraphs for the sobre-mi section.',
  })
  about?: string[];

  @ApiProperty({ required: false, type: [AboutNoteDto] })
  notes?: AboutNoteDto[];

  @ApiProperty({
    required: false,
    description: 'Correspondence letter text for the contacto section.',
  })
  letter?: string;

  @ApiProperty({
    required: false,
    description: 'Public CV download URL.',
  })
  cvUrl?: string;

  @ApiProperty({
    required: false,
    description: 'Featured quote for the about section.',
  })
  quote?: string;

  @ApiProperty({
    required: false,
    description: 'Attribution under the featured quote.',
  })
  quoteSource?: string;

  @ApiProperty({
    required: false,
    type: [FactDto],
    description: 'Fact sheet under the portrait.',
  })
  facts?: FactDto[];

  @ApiProperty({
    required: false,
    type: [PrincipleDto],
    description: 'How I work principles; the web numbers them I., II., III.',
  })
  principles?: PrincipleDto[];

  @ApiProperty({
    required: false,
    description: 'IANA zone for the directory local clock, e.g. America/Lima.',
  })
  timezone?: string;

  @ApiProperty({
    required: false,
    description: 'Working-hours note under the location.',
  })
  hoursNote?: string;

  @ApiProperty({
    required: false,
    type: NowDto,
    description: 'Right-now block.',
  })
  now?: NowDto;

  @ApiProperty({
    required: false,
    type: ProfileEditionsDto,
    description:
      'Per-edition overrides; they win over the base profile fields.',
  })
  editions?: ProfileEditionsDto;
}
