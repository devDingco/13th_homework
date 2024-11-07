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
exports.UpdateBoardCommentDTO = void 0;
const class_validator_1 = require("class-validator");
const create_board_comment_dto_1 = require("./create-board-comment.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateBoardCommentDTO extends (0, mapped_types_1.PartialType)(create_board_comment_dto_1.CreateBoardCommentDTO) {
}
exports.UpdateBoardCommentDTO = UpdateBoardCommentDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateBoardCommentDTO.prototype, "password", void 0);
//# sourceMappingURL=update-board-comment.dto.js.map