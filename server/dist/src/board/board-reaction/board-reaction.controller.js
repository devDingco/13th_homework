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
exports.BoardReactionController = void 0;
const common_1 = require("@nestjs/common");
const board_reaction_service_1 = require("./board-reaction.service");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
let BoardReactionController = class BoardReactionController {
    constructor(boardReactionService) {
        this.boardReactionService = boardReactionService;
    }
    getBoardReaction(BoardId) {
        return this.boardReactionService.getBoardReaction(BoardId);
    }
};
exports.BoardReactionController = BoardReactionController;
__decorate([
    (0, common_1.Get)(),
    (0, response_message_decorator_1.ResponseMessage)(`board의 reaction을 성공적으로 가져왔습니다.`),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BoardReactionController.prototype, "getBoardReaction", null);
exports.BoardReactionController = BoardReactionController = __decorate([
    (0, common_1.Controller)('/api/board/:boardId/reaction'),
    __metadata("design:paramtypes", [board_reaction_service_1.BoardReactionService])
], BoardReactionController);
//# sourceMappingURL=board-reaction.controller.js.map