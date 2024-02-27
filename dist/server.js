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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = __importStar(require("express"));
const userModel_1 = require("./models/userModel");
const server = app();
const router = app.Router();
const STATUS = {
    OK: 200,
    CREATED: 201,
    UPDATED: 201,
    NOT_FOUND: 400,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    DEFAULT_ERROR: 418,
};
router.get('/user', async (req, res) => {
    const { page, limit } = req.query;
    const [users, total] = await Promise.all([
        userModel_1.UserModel.find().lean(),
        userModel_1.UserModel.count(),
    ]);
    return res.json({
        rows: users,
        page,
        limit,
        total,
    });
});
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userModel_1.UserModel.findOne({ _id: id }).lean();
    if (!user) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Region not found' });
    }
    return user;
});
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { update } = req.body;
    const user = await userModel_1.UserModel.findOne({ _id: id }).lean();
    if (!user) {
        res.status(STATUS.DEFAULT_ERROR).json({ message: 'Region not found' });
    }
    user.name = update.name;
    await user.save();
    return res.sendStatus(201);
});
server.use(router);
exports.default = server.listen(3003);
//# sourceMappingURL=server.js.map