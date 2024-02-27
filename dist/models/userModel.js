"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionModel = exports.UserModel = void 0;
require("reflect-metadata");
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("../types/User");
const Regiao_1 = require("../types/Regiao");
exports.UserModel = (0, typegoose_1.getModelForClass)(User_1.User);
exports.RegionModel = (0, typegoose_1.getModelForClass)(Regiao_1.Region);
//# sourceMappingURL=userModel.js.map