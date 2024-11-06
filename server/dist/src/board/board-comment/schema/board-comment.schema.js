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
exports.BoardCommentSchema = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let BoardCommentSchema = class BoardCommentSchema {
};
exports.BoardCommentSchema = BoardCommentSchema;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", typeorm_1.ObjectId)
], BoardCommentSchema.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoardCommentSchema.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoardCommentSchema.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], BoardCommentSchema.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BoardCommentSchema.prototype, "parentId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoardCommentSchema.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BoardCommentSchema.prototype, "boardId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], BoardCommentSchema.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], BoardCommentSchema.prototype, "updatedAt", void 0);
exports.BoardCommentSchema = BoardCommentSchema = __decorate([
    (0, graphql_1.ObjectType)()
], BoardCommentSchema);
//# sourceMappingURL=board-comment.schema.js.map