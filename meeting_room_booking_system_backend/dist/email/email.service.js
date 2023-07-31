"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer_1 = require("nodemailer");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = (0, nodemailer_1.createTransport)({
            host: this.configService.get('nodemailer_host'),
            port: this.configService.get('nodemailer_port'),
            secure: false,
            auth: {
                user: this.configService.get('nodemailer_auth_user'),
                pass: this.configService.get('nodemailer_auth_pass'),
            },
        });
    }
    async sendMail({ to, subject, html }) {
        await this.transporter.sendMail({
            from: {
                name: '会议室预定系统',
                address: this.configService.get("nodemailer_auth_user"),
            },
            to,
            subject,
            html,
        });
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map