"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        const isHttp = context.getType() === 'http';
        const isGraphQL = context.getType() === 'graphql';
        let method = '';
        let url = '';
        if (isHttp) {
            const request = context.switchToHttp().getRequest();
            method = request.method;
            url = request.url;
            console.log(`Incoming ${method} request to ${url}`);
        }
        if (isGraphQL) {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const info = ctx.getInfo();
            const fieldName = info.path.key;
            const fieldMethod = info.path.typename;
            method = fieldMethod;
            url = fieldName;
            console.log(`Incoming GraphQL ${method} : ${url}`);
        }
        console.log('Before...');
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            console.log(`Outgoing response for ${method} ${url}`);
            console.log(`After... ${Date.now() - now}ms`);
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map