import { UserModel } from '../models/userModel';
import { USER } from '../types/User';

const createUser = async (userData: USER) => {
  const user = await UserModel.create(userData);
  return user;
};

const getUserById = async (id: string) => {
  return UserModel.findById(id).lean();
};

const updateUserById = async (id: string, updates: any) => {
  return UserModel.findByIdAndUpdate(id, updates, { new: true }).lean();
};

const listUsers = async (page: number, limit: number) => {
  const users = await UserModel.find().limit(limit).skip((page - 1) * limit).lean();
  const total = await UserModel.countDocuments();
  return { users, total, page, limit };
};

export { createUser, getUserById, updateUserById, listUsers };
