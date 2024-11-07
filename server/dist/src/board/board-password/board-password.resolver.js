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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardPasswordResolver = void 0;
const board_password_service_1 = require("./board-password.service");
const graphql_1 = require("@nestjs/graphql");
let BoardPasswordResolver = class BoardPasswordResolver {
    constructor(boardPasswordService) {
        this.boardPasswordService = boardPasswordService;
    }
    isPasswordCorrect(boardId, password) {
        return this.boardPasswordService.validateBoardData(boardId, password);
    }
};
exports.BoardPasswordResolver = BoardPasswordResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('boardId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], BoardPasswordResolver.prototype, "isPasswordCorrect", null);
exports.BoardPasswordResolver = BoardPasswordResolver = __decorate([
    (0, graphql_1.Resolver)(() => Boolean),
    __metadata("design:paramtypes", [board_password_service_1.BoardPasswordService])
], BoardPasswordResolver);
//# sourceMappingURL=board-password.resolver.js.map