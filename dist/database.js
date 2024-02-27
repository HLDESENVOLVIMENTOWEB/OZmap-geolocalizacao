"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env = {
    MONGO_URI: 'mongodb://root:123123@127.0.0.1:27021/oz-tech-test?authSource=admin',
};
const init = async function () {
    await mongoose_1.default.connect(env.MONGO_URI);
};
exports.default = init();
//# sourceMappingURL=database.js.map