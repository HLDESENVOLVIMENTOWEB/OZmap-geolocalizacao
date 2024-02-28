// Importações necessárias
import { createUser, getUserById, updateUserById, listUsers } from '../../src/services/useService';
import { UserModel } from '../../src/models/userModel';

// Dados mock para o teste
const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  coordinates: [123, 456] as [number, number],
};

// Configuração do mock para UserModel
jest.mock('../../src/models/userModel', () => ({
  UserModel: {
    create: jest.fn().mockResolvedValue({
      name: 'Test User',
      email: 'test@example.com',
      coordinates: [123, 456] as [number, number],
    }),
    findById: jest.fn().mockImplementation(() => ({
      lean: jest.fn().mockResolvedValue({
        name: 'Test User',
        email: 'test@example.com',
        coordinates: [123, 456] as [number, number],
      })
    })),
    findByIdAndUpdate: jest.fn().mockImplementation(() => ({
      lean: jest.fn().mockResolvedValue({
        name: 'Test User',
        email: 'test@example.com',
        coordinates: [123, 456] as [number, number],
      })
    })),
    find: jest.fn().mockImplementation(() => ({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue([{
        name: 'Test User',
        email: 'test@example.com',
        coordinates: [123, 456] as [number, number],
      }])
    })),
    countDocuments: jest.fn().mockResolvedValue(1),
  },
}));

describe('UserService', () => {
  beforeEach(() => {
    // Limpa todas as implementações de mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    const result = await createUser({
      name: 'Test User',
      email: 'test@example.com',
      coordinates: [123, 456] as [number, number],
    });
    expect(UserModel.create).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      coordinates: [123, 456] as [number, number],
    });
    expect(result).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      coordinates: [123, 456] as [number, number],
    });
  });

  it('should get a user by ID successfully', async () => {
    const result = await getUserById('someUserId');
    expect(UserModel.findById).toHaveBeenCalledWith('someUserId');
    // A cadeia .lean() é simulada, então não precisamos verificar especificamente aqui
    expect(result).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      coordinates: [123, 456] as [number, number],
    });
  });

  it('should update a user by ID successfully', async () => {
    const updates = { name: 'Updated Name' };
    const result = await updateUserById('someUserId', updates);
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith('someUserId', updates, { new: true });
    // A cadeia .lean() é simulada, então não precisamos verificar especificamente aqui
    expect(result).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      coordinates: [123, 456] as [number, number],
    });
  });

  it('should list users successfully', async () => {
    const page = 1;
    const limit = 10;
    const result = await listUsers(page, limit);
    expect(UserModel.find).toHaveBeenCalled(); // Verifica se o método find foi chamado
    expect(UserModel.countDocuments).toHaveBeenCalled(); // Verifica se o método countDocuments foi chamado
    expect(result.users).toEqual([{
      name: 'Test User',
      email: 'test@example.com',
      coordinates: [123, 456] as [number, number],
    }]);
    expect(result.total).toEqual(1);
    expect(result.page).toEqual(page);
    expect(result.limit).toEqual(limit);
  });
});
