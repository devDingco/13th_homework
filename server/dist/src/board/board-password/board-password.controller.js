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
exports.BoardPasswordController = void 0;
const common_1 = require("@nestjs/common");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
const board_password_service_1 = require("./board-password.service");
const board_password_dto_1 = require("./dto/board-password.dto");
let BoardPasswordController = class BoardPasswordController {
    constructor(boardPasswordService) {
        this.boardPasswordService = boardPasswordService;
    }
    validateBoardData(boardId, body) {
        return this.boardPasswordService.validateBoardData(boardId, body.password);
    }
};
exports.BoardPasswordController = BoardPasswordController;
__decorate([
    (0, common_1.Post)(),
    (0, response_message_decorator_1.ResponseMessage)('password가 일치합니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, board_password_dto_1.BoardPasswordDTO]),
    __metadata("design:returntype", Promise)
], BoardPasswordController.prototype, "validateBoardData", null);
exports.BoardPasswordController = BoardPasswordController = __decorate([
    (0, common_1.Controller)('/api/board/:boardId/password'),
    __metadata("design:paramtypes", [board_password_service_1.BoardPasswordService])
], BoardPasswordController);
//# sourceMappingURL=board-password.controller.js.map