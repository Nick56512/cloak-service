import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { InjectionTokens } from "src/core/@types";
import { IpBlacklistDocument, UserAgentBlacklistDocument } from "src/core/database/entities/request.blacklist";
import { RequestHistoryDocument } from "src/core/database/entities/request.history";
import { IModelRepository } from "src/core/database/repository/imodel.repository";
import { DetectService } from "./detect.service";
import { DetectController } from "./detect.controller";

@Module({
    imports: [],
    providers: [
        {
            provide: InjectionTokens.DetectService,
            useFactory: (
                requestHistory: IModelRepository<RequestHistoryDocument>,
                IpBlacklist: IModelRepository<IpBlacklistDocument>,
                userAgentBlacklist: IModelRepository<UserAgentBlacklistDocument>
            ) => {
                return new DetectService(requestHistory, IpBlacklist, userAgentBlacklist)
            },
            inject: [
                InjectionTokens.RequestHistoryRepository,
                InjectionTokens.IpBlacklistRepository,
                InjectionTokens.UserAgentBlacklistRepository
            ]
        }
    ],
    controllers: [ DetectController ]
})
export class DetectModule {}