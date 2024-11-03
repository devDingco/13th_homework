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
exports.BoardReactionSchema = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let BoardReactionSchema = class BoardReactionSchema {
    constructor() {
        this.like = 0;
        this.hate = 0;
    }
};
exports.BoardReactionSchema = BoardReactionSchema;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", typeorm_1.ObjectId)
], BoardReactionSchema.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BoardReactionSchema.prototype, "boardId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BoardReactionSchema.prototype, "like", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BoardReactionSchema.prototype, "hate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], BoardReactionSchema.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], BoardReactionSchema.prototype, "updatedAt", void 0);
exports.BoardReactionSchema = BoardReactionSchema = __decorate([
    (0, graphql_1.ObjectType)()
], BoardReactionSchema);
//# sourceMappingURL=board-reaction.schema.js.map