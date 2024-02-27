import { Router } from 'express';
import * as userController from '../contollers/useController';

const router = Router();

router.get('/', userController.listUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUserById);

export default router;
