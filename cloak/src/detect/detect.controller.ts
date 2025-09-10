import { Controller, Get, Inject, Req } from "@nestjs/common";
import { InjectionTokens } from "src/core/@types";
import { IDetectService } from "./detect.service";
import { Request } from "express";

@Controller('/detect')
export class DetectController {
    constructor(@Inject(InjectionTokens.DetectService) private readonly detectService: IDetectService) {}

    @Get() 
    public detectBot(@Req() request: Request) {
        return this.detectService.detectByRequest(request)
    }
}