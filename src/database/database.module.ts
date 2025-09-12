import { Global, Module, Provider } from "@nestjs/common";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { ConfigParams, InjectionTokens } from "@types";
import {
  RequestHistory,
  RequestHistorySchema,
} from "./entities/request.history";
import { Document, Model } from "mongoose";
import { BaseRepository } from "./repository/model.repository";
import {
  RequestBlacklist,
  RequestBlacklistSchema,
} from "./entities/request.blacklist";

function provideRepository<T extends Document>(
  provide: string,
  model: string,
): Provider {
  return {
    provide,
    useFactory: (model: Model<T>) => {
      return new BaseRepository<T>(model);
    },
    inject: [getModelToken(model)],
  };
}

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>(ConfigParams.CONNECTION_STRING),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: RequestHistory.name, schema: RequestHistorySchema },
      { name: RequestBlacklist.name, schema: RequestBlacklistSchema },
    ]),
  ],
  providers: [
    provideRepository(
      InjectionTokens.RequestHistoryRepository,
      RequestHistory.name,
    ),
    provideRepository(
      InjectionTokens.RequestBlacklistRepository,
      RequestBlacklist.name,
    ),
  ],
  exports: [
    InjectionTokens.RequestHistoryRepository,
    InjectionTokens.RequestBlacklistRepository,
  ],
})
export class DatabaseModule {}
