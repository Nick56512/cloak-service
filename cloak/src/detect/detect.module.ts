import { Module } from '@nestjs/common';
import { DetectService } from './detect.service';
import { DetectController } from './detect.controller';
import { InjectionTokens } from '@types';
import { IModelRepository } from '@database/repository/imodel.repository';
import { RequestHistoryDocument } from '@database/entities/request.history';
import { RequestBlacklistDocument } from '@database/entities/request.blacklist';

@Module({
  imports: [],
  providers: [
    {
      provide: InjectionTokens.DetectService,
      useFactory: (
        requestHistory: IModelRepository<RequestHistoryDocument>,
        requestBlacklist: IModelRepository<RequestBlacklistDocument>,
      ) => {
        return new DetectService(requestHistory, requestBlacklist);
      },
      inject: [
        InjectionTokens.RequestHistoryRepository,
        InjectionTokens.RequestBlacklistRepository,
      ],
    },
  ],
  controllers: [DetectController],
})
export class DetectModule {}
