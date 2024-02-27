"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = require("../models/userModel");
const router = (0, express_1.Router)();
// GET /user
router.get('/', async (req, res) => {
    try {
        const users = await userModel_1.UserModel.find();
        res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Ocorreu um erro desconhecido' });
        }
    }
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map