import { RegionModel } from '../models/regionModal'; 
import { Region } from '../types/Regiao'; 


export const createRegion = async (regionData: Region): Promise<Region> => {
  const region = new RegionModel(regionData);
  await region.save();
  return region.toObject(); 
};

export const getRegionById = async (id: string): Promise<Region | null> => {
  const region = await RegionModel.findById(id).lean();
  if (!region) return null;
  
  const adjustedRegion: Region = {
    ...region,
    _id: region._id.toString(), 
  };
  delete (adjustedRegion as any)._id; 
  return adjustedRegion;
};

export const updateRegionById = async (id: string, regionData: Partial<Region>): Promise<Region | null> => {
  const updatedRegion = await RegionModel.findByIdAndUpdate(id, regionData, { new: true }).lean();
  return updatedRegion;
};

export const deleteRegionById = async (id: string): Promise<boolean> => {
  const result = await RegionModel.findByIdAndDelete(id);
  return !!result; 
};

export const listRegions = async (): Promise<Region[]> => {
  const regions = await RegionModel.find().lean();
  return regions;
};

export const findRegionsContainingPoint = async (point: { type: string; coordinates: number[] }) => {
  const regions = await RegionModel.find({
    geometry: {
      $geoIntersects: {
        $geometry: point,
      },
    },
  }).lean();
  return regions;
};

export const findRegionsNearPoint = async (point: { type: string; coordinates: number[] }, distance: number) => {
  const regions = await RegionModel.find({
    geometry: {
      $near: {
        $geometry: point,
        $maxDistance: distance, 
      },
    },
  }).lean();
  return regions;
};
