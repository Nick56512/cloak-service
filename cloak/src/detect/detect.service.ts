import { RequestBlacklistDocument } from '@database/entities/request.blacklist';
import { RequestHistoryDocument } from '@database/entities/request.history';
import { IModelRepository } from '@database/repository/imodel.repository';
import { Injectable } from '@nestjs/common';
import { DetectResult, RequestDto } from './detect.models';

export interface IDetectBotService {
  detectBotByRequest(request: RequestDto): Promise<DetectResult | null>;
}

@Injectable()
export class DetectService implements IDetectBotService {
  constructor(
    private readonly requestHistoryRepository: IModelRepository<RequestHistoryDocument>,
    private readonly requestBlacklistRepository: IModelRepository<RequestBlacklistDocument>,
  ) {}

  async detectBotByRequest(request: RequestDto): Promise<DetectResult | null> {
    if (!request.ip) {
      return null;
    }
    const detectResult: DetectResult = {
      ip: request.ip,
      isBot: false,
    };
    const blacklistResult = await this.requestBlacklistRepository.findOne({
      $or: [{ ip: request.ip }, { userAgent: request.userAgent }],
    });
    if (blacklistResult) {
      await this.requestBlacklistRepository.create(request);
      detectResult.isBot = true;
    } else {
      await this.requestHistoryRepository.create(request);
    }
    return detectResult;
  }
}
