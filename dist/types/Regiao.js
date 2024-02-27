"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const mongoose = __importStar(require("mongoose"));
var ObjectId = mongoose.Types.ObjectId;
const User_1 = require("./User");
class Base extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.Prop)({ required: true, default: () => (new ObjectId()).toString() }),
    __metadata("design:type", String)
], Base.prototype, "_id", void 0);
let Region = class Region extends Base {
};
exports.Region = Region;
__decorate([
    (0, typegoose_1.Prop)({ required: true, auto: true }),
    __metadata("design:type", String)
], Region.prototype, "_id", void 0);
__decorate([
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Region.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.Prop)({ ref: () => User_1.User, required: true, type: () => String }),
    __metadata("design:type", Object)
], Region.prototype, "user", void 0);
exports.Region = Region = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { validateBeforeSave: false } })
], Region);
//# sourceMappingURL=Regiao.js.map