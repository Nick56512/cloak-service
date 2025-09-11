import {
  Controller,
  Post,
  Inject,
  Body,
  ValidationPipe,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import {
  InjectionTokens,
  Routes,
  SwaggerDescription,
  SwaggerTag,
  SwaggerTitles,
} from '@types';
import { RequestDto } from './detect.models';
import { IDetectBotService } from './detect.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags(SwaggerTag.DetectTag)
@Controller(Routes.Detect)
export class DetectController {
  constructor(
    @Inject(InjectionTokens.DetectService)
    private readonly detectService: IDetectBotService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: SwaggerTitles.DetectBotOperation })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: SwaggerDescription.ResponseDetectBot,
    type: RequestDto,
  })
  public detectBot(@Body() request: RequestDto) {
    return this.detectService.detectBotByRequest(request);
  }
}
