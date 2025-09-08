import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RequestHistory, RequestHistorySchema } from "./entities/request.history";
import appConfig from "../config/app.config";
import { ConfigService } from "@nestjs/config";
import { ConfigParams } from "../@types";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow<string>(ConfigParams.CONNECTION_STRING) 
            }),
            inject: [ConfigService]
        })
    ],
    exports: [ MongooseModule ]
})
export class DatabaseModule {}