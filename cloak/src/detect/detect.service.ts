import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { DetectResult } from "src/core/@types";
import { IpBlacklistDocument, UserAgentBlacklistDocument } from "src/core/database/entities/request.blacklist";
import { RequestHistoryDocument } from "src/core/database/entities/request.history";
import { IModelRepository } from "src/core/database/repository/imodel.repository";

export interface IDetectService {
    detectByRequest(request: Request): Promise<DetectResult | null>
}

@Injectable()
export class DetectService implements IDetectService  {

    constructor(
        private readonly requestHistoryRepository: IModelRepository<RequestHistoryDocument>,
        private readonly ipBlacklistRepository: IModelRepository<IpBlacklistDocument>,
        private readonly userAgentBlacklistRepository: IModelRepository<UserAgentBlacklistDocument>
    ) {}

    async detectByRequest(request: Request): Promise<DetectResult | null> {
        if(!request.ip) {
            return null
        }
        const requestData = {
            ip: request.ip,
            userAgent: request.headers["user-agent"],
            acceptLanguage: request.headers["accept-language"],
            acceptEncoding: request.headers['accept-encoding']
        }
        let detectResult: DetectResult = {
            ip: request.ip,
            isBot: false
        }
        const ipResult = await this.ipBlacklistRepository.findOne({
            ip: requestData.ip
        })
        if(ipResult) {
           detectResult.isBot = true
           return detectResult
        }
        const userAgentResult = await this.userAgentBlacklistRepository.findOne({
            userAgent: requestData.userAgent
        })
        if(userAgentResult) {
            detectResult.isBot = true
           return detectResult
        }
        await this.requestHistoryRepository.create(requestData)
        return detectResult
    }

}