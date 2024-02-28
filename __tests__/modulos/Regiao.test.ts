import { Region, RegionModel } from '../../src/models/regionModal';
import * as regionService from '../../src/services/regiaoService';
import { Types } from 'mongoose';

type NewRegion = Omit<Region, '_id'>;

jest.mock('../../src/models/regionModal', () => ({
  RegionModel: {
    create: jest.fn().mockImplementation(() => Promise.resolve({
      _id: new Types.ObjectId().toString(), 
      name: 'Test Region',
      geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] },
      user: 'someUserId',
    })),
    findById: jest.fn().mockImplementation(() => ({
      lean: jest.fn().mockResolvedValue({
        _id: 'mockId',
        name: 'Mock Region by ID',
      }),
    })),
    findByIdAndUpdate: jest.fn().mockImplementation(() => ({
      lean: jest.fn().mockResolvedValue({
        _id: 'mockId',
        name: 'Updated Mock Region',
      }),
    })),
    findByIdAndDelete: jest.fn().mockResolvedValue(true),
    find: jest.fn().mockImplementation(() => ({
      lean: jest.fn().mockResolvedValue([
        { _id: 'mockId1', name: 'Mock Region 1' },
        { _id: 'mockId2', name: 'Mock Region 2' },
      ]),
    })),
  },
}));

describe('Region Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a region successfully', async () => {
    const newRegion: NewRegion = {
      name: 'Test Region',
      geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] },
      user: 'someUserId',
    };
  
    const result = await regionService.createRegion(newRegion);
  
    expect(result).toEqual(expect.objectContaining(newRegion));
    expect(RegionModel.create).toHaveBeenCalledWith(newRegion);
  });
  


  it('updateRegionById updates a region correctly', async () => {
    const result = await regionService.updateRegionById('mockId', { name: 'Updated Mock Region' });

    expect(result).toEqual(expect.objectContaining({
      _id: 'mockId',
      name: 'Updated Mock Region',
    }));
    expect(RegionModel.findByIdAndUpdate).toHaveBeenCalledWith('mockId', { name: 'Updated Mock Region' }, { new: true });
  });

  it('deleteRegionById deletes a region correctly', async () => {
    const result = await regionService.deleteRegionById('mockId');

    expect(result).toBeTruthy();
    expect(RegionModel.findByIdAndDelete).toHaveBeenCalledWith('mockId');
  });

  it('listRegions lists all regions correctly', async () => {
    const result = await regionService.listRegions();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('_id');
    expect(result[0]).toHaveProperty('name');
    expect(RegionModel.find).toHaveBeenCalled();
  });


});
