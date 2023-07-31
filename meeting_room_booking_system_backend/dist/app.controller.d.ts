import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    aaaa(): string;
    cccc(username: string, userInfo: any): string;
    bbb(): string;
}
