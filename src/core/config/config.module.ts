import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./app.config";
import Joi from "joi";
import { ConfigParams } from "@types";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: Joi.object({
        [ConfigParams.CONNECTION_STRING]: Joi.string().required(),
        [ConfigParams.PORT]: Joi.number().default(3000),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
