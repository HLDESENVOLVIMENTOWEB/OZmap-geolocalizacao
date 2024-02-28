import { createUser } from '../../src/services/useService';
import { UserModel } from '../../src/models/userModel';

const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  coordinates: [123, 456] as [number, number], 
};

jest.mock('../../src/models/userModel', () => ({
  UserModel: {
    create: jest.fn().mockImplementation(() => Promise.resolve(mockUser)), 
  },
}));

describe('UserService - createUser Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    const result = await createUser(mockUser);
    expect(UserModel.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });
});
