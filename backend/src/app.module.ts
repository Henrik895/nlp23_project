import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [ModelsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
