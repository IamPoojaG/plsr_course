import express from 'express';
import {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
} from '../controller/userController.js';

const router = express.Router();

router.post('/add', createUser);
router.put('/:id', updateUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

export default router;
