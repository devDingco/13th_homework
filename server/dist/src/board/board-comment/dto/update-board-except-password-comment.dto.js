"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoardCommentExceptPasswordDTO = void 0;
const create_board_comment_dto_1 = require("./create-board-comment.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateBoardCommentExceptPasswordDTO extends (0, mapped_types_1.PartialType)(create_board_comment_dto_1.CreateBoardCommentDTO) {
}
exports.UpdateBoardCommentExceptPasswordDTO = UpdateBoardCommentExceptPasswordDTO;
//# sourceMappingURL=update-board-except-password-comment.dto.js.map