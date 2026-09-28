import { ApiProperty } from '@nestjs/swagger';

export class SocialDto {
  @ApiProperty()
  label!: string;

  @ApiProperty()
  url!: string;
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
}
