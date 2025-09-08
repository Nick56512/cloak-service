import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { DetectModule } from './detect/detect.module';
import { ConfigurationModule } from './core/config/config.module';

@Module({
  imports: [ 
    ConfigurationModule,
    DatabaseModule,
    DetectModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
