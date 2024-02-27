import { Router } from 'express';
import { UserModel } from '../models/userModel'; 
import { STATUS } from '../types/Status';
const router = Router();


router.get('/', async (req, res) => {
  try {
    const { page, limit } = req.query;

    const [users, total] = await Promise.all([
      UserModel.find().lean(),
      UserModel.count(),
    ]);
  
    return res.json({
      rows: users,
      page,
      limit,
      total,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Region not found' });
    }
  }
});

router.get('/users/:id', async (req, res) => {
  try {
  const { id } = req.params;

  const user = await UserModel.findOne({ _id: id }).lean();

  if (!user) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Region not found' });
  }

  return user;
} catch (error) {
  if (error instanceof Error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
  } else {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Region not found' });
  }
}
});

router.post('/users', async (req, res) => {
  try {
    const { name, email, address, coordinates } = req.body;

    const user = new UserModel({
      name,
      email,
      address,
      coordinates
    });

    await user.save();

    return res.sendStatus(STATUS.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
});


router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, updates, { new: true });

    if (!updatedUser) {
      res.status(STATUS.NOT_FOUND).json({ message: 'User not found' });
      return;
    }

    res.status(STATUS.UPDATED).json(updatedUser); 
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
});




export default router;
