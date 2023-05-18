import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ModelsController],
  imports: [HttpModule],
})
export class ModelsModule {}
