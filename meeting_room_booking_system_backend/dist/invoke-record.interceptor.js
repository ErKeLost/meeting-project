"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InvokeRecordInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvokeRecordInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let InvokeRecordInterceptor = InvokeRecordInterceptor_1 = class InvokeRecordInterceptor {
    constructor() {
        this.logger = new common_1.Logger(InvokeRecordInterceptor_1.name);
    }
    intercept(context, next) {
        var _a, _b;
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const userAgent = request.headers['user-agent'];
        const { ip, method, path } = request;
        this.logger.debug(`${method} ${path} ${ip} ${userAgent}: ${context.getClass().name} ${context.getHandler().name} invoked...`);
        this.logger.debug(`user: ${(_a = request.user) === null || _a === void 0 ? void 0 : _a.userId}, ${(_b = request.user) === null || _b === void 0 ? void 0 : _b.username}`);
        const now = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)((res) => {
            this.logger.debug(`${method} ${path} ${ip} ${userAgent}: ${response.statusCode}: ${Date.now() - now}ms`);
            this.logger.debug(`Response: ${JSON.stringify(res)}`);
        }));
    }
};
InvokeRecordInterceptor = InvokeRecordInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], InvokeRecordInterceptor);
exports.InvokeRecordInterceptor = InvokeRecordInterceptor;
//# sourceMappingURL=invoke-record.interceptor.js.map