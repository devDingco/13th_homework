"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformBoardInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformBoardInterceptor = class TransformBoardInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (Array.isArray(data.result)) {
                const sanitizedResult = data.result.map((item) => this.removeSensitiveData(item));
                return {
                    ...data,
                    result: sanitizedResult,
                };
            }
            if (typeof data === 'object' && data !== null) {
                return this.removeSensitiveData(data);
            }
            return data;
        }));
    }
    removeSensitiveData(item) {
        if (item && typeof item === 'object') {
            const { _id, ...rest } = item;
            return rest;
        }
        return item;
    }
};
exports.TransformBoardInterceptor = TransformBoardInterceptor;
exports.TransformBoardInterceptor = TransformBoardInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformBoardInterceptor);
//# sourceMappingURL=transform-board.interceptor.js.map