export declare class EmailController {
    private emailService;
    private redisService;
    captcha(address: string): Promise<string>;
}
