import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getDescription() {
    return {description: 'This is an API for the co-pilot project'};
  }
}
