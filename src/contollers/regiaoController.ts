import { Request, Response } from 'express';
import * as regionService from '../services/regiaoService';

export const createRegion = async (req: Request, res: Response): Promise<void> => {
  try {
    const regionData = req.body;
    const region = await regionService.createRegion(regionData);
    res.status(201).json(region);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const getRegionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const region = await regionService.getRegionById(id);
    if (!region) {
      res.status(404).json({ message: 'Region not found' });
      return;
    }
    res.json(region);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const updateRegionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedRegion = await regionService.updateRegionById(id, updateData);
    if (!updatedRegion) {
      res.status(404).json({ message: 'Region not found' });
      return;
    }
    res.json(updatedRegion);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const deleteRegionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await regionService.deleteRegionById(id);
    if (!result) {
      res.status(404).json({ message: 'Region not found' });
      return;
    }
    res.status(204).send(); 
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const listRegions = async (req: Request, res: Response): Promise<void> => {
  try {
    const regions = await regionService.listRegions();
    res.json(regions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const listRegionsContainingPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const point = req.body.point; 
    const regions = await regionService.findRegionsContainingPoint(point);
    res.json(regions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const listRegionsNearPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { point, distance } = req.body; 
    const regions = await regionService.findRegionsNearPoint(point, distance);
    res.json(regions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};
