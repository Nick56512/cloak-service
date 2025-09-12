import { IsIP, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiProperties } from '@types';

export class RequestDto {
  @IsIP()
  @IsNotEmpty()
  @ApiProperty({
    example: ApiProperties.IpExample,
    description: ApiProperties.IpDescription,
  })
  ip: string;

  @IsString()
  @ApiProperty({
    example: ApiProperties.UserAgentExample,
    description: ApiProperties.UserAgentDescription,
  })
  userAgent: string;
}

export type DetectResult = {
  isBot: boolean;
  ip: string;
};
