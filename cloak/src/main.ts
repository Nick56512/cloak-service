import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  ConfigParams,
  Routes,
  SwaggerTitles,
  SwaggerTag,
  SwaggerDescription,
  ApiVersions,
} from '@types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwaggerDocs(app);
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>(ConfigParams.PORT);
  const b =5
  await app.listen(port);
}
function setupSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(SwaggerTitles.DocsTitle)
    .setDescription(SwaggerDescription.DocsDescription)
    .setVersion(ApiVersions.version)
    .addTag(SwaggerTag.DocsTag)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Routes.ApiDocs, app, document);
}
bootstrap();
