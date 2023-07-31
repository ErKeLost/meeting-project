import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { UserInfo } from './custom.decorator';
import { User } from './user/entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @SetMetadata('require-login', true)
  @SetMetadata('require-permission', ['ddd'])
  aaaa() {
    return 'aaa';
  }

  @Get('ccc')
  @SetMetadata('require-login', true)
  @SetMetadata('require-permission', ['ccc'])
  cccc(@UserInfo('username') username: string, @UserInfo() userInfo) {
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
