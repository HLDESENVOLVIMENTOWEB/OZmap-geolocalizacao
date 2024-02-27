import { Router } from 'express';
import { UserModel } from '../models/userModel'; 
const router = Router();

// GET /user
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Ocorreu um erro desconhecido' });
    }
  }
});


export default router;
