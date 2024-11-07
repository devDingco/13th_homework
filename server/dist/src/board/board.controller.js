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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const board_service_1 = require("./board.service");
const create_board_dto_1 = require("./dto/create-board.dto");
const update_board_dto_1 = require("./dto/update-board.dto");
const response_message_decorator_1 = require("../common/decorators/response-message.decorator");
const pagination_dto_1 = require("./dto/pagination.dto");
const transform_board_interceptor_1 = require("../common/interceptors/transform-board.interceptor");
let BoardController = class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    createBoard(createBoardDTO) {
        return this.boardService.create(createBoardDTO);
    }
    getBoards(query) {
        return this.boardService.findAll(query);
    }
    getBoard(boardId) {
        return this.boardService.findOne(boardId);
    }
    updateBoard(boardId, updateBoardDTO) {
        return this.boardService.updateAll(boardId, updateBoardDTO);
    }
    removeBoard(boardId) {
        return this.boardService.remove(boardId);
    }
    clearBoard() {
        return this.boardService.clear();
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, common_1.Post)(),
    (0, response_message_decorator_1.ResponseMessage)('board가 성공적으로 생성되었습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDTO]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Get)(),
    (0, response_message_decorator_1.ResponseMessage)('board 전체를 성공적으로 가져왔습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDTO]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "getBoards", null);
__decorate([
    (0, common_1.Get)(':boardId'),
    (0, response_message_decorator_1.ResponseMessage)('board를 성공적으로 가져왔습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "getBoard", null);
__decorate([
    (0, common_1.Put)(':boardId'),
    (0, response_message_decorator_1.ResponseMessage)('board 전체를 성공적으로 수정했습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_board_dto_1.UpdateBoardDTO]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "updateBoard", null);
__decorate([
    (0, common_1.Delete)(':boardId'),
    (0, response_message_decorator_1.ResponseMessage)('board를 성공적으로 삭제했습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "removeBoard", null);
__decorate([
    (0, common_1.Delete)(),
    (0, response_message_decorator_1.ResponseMessage)('board 전체를 성공적으로 삭제했습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "clearBoard", null);
exports.BoardController = BoardController = __decorate([
    (0, common_1.UseInterceptors)(transform_board_interceptor_1.TransformBoardInterceptor),
    (0, common_1.Controller)('/api/board'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
//# sourceMappingURL=board.controller.js.map