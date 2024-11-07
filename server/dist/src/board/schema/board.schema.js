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
exports.BoardSchema = void 0;
const graphql_1 = require("@nestjs/graphql");
const board_address_input_schema_1 = require("./board-address-input.schema");
const typeorm_1 = require("typeorm");
let BoardSchema = class BoardSchema {
};
exports.BoardSchema = BoardSchema;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", typeorm_1.ObjectId)
], BoardSchema.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoardSchema.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoardSchema.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BoardSchema.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], BoardSchema.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BoardSchema.prototype, "youtubeUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => board_address_input_schema_1.BoardAddressOutput, { nullable: true }),
    __metadata("design:type", board_address_input_schema_1.BoardAddressOutput)
], BoardSchema.prototype, "boardAddressOutput", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BoardSchema.prototype, "boardId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], BoardSchema.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], BoardSchema.prototype, "updatedAt", void 0);
exports.BoardSchema = BoardSchema = __decorate([
    (0, graphql_1.ObjectType)()
], BoardSchema);
//# sourceMappingURL=board.schema.js.map