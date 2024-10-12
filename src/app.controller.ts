import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(`/:id/:name/test`)
  getHello(@Param() param: any): string {
    console.log(param)
    return this.appService.getHello();
  }

}
