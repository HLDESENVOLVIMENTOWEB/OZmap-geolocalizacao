import { Request, Response } from 'express';
import * as regionService from '../services/regiaoService';
import { STATUS } from '../types/Status';

import { winstonLogger } from '../logger';

export const createRegion = async (req: Request, res: Response): Promise<void> => {
  try {
    const regionData = req.body;
    const region = await regionService.createRegion(regionData);
    winstonLogger.debug(region);
    res.status(STATUS.CREATED).json(region);
  } catch (error) {
    if (error instanceof Error) {
      winstonLogger.error(error.message);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      winstonLogger.error(STATUS.INTERNAL_SERVER_ERROR+' An unknown error occurred.');
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getRegionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const region = await regionService.getRegionById(id);
    if (!region) {
      winstonLogger.info(STATUS.NOT_FOUND+' Region not found.');
      res.status(STATUS.NOT_FOUND).json({ message: 'Region not found' });
      return;
    }
    winstonLogger.debug(region);
    res.status(STATUS.CREATED).json(region);
  } catch (error) {
    if (error instanceof Error) {
      winstonLogger.error(error.message);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      winstonLogger.error('An unknown error occurred');
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updateRegionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedRegion = await regionService.updateRegionById(id, updateData);
    if (!updatedRegion) {
      winstonLogger.info(STATUS.NOT_FOUND+' Region not found.');
      res.status(STATUS.NOT_FOUND).json({ message: 'Region not found' });
      return;
    }
    winstonLogger.debug(updatedRegion);
    res.status(STATUS.UPDATED).json({ message: updatedRegion });
  } catch (error) {
    if (error instanceof Error) {
      winstonLogger.error(error.message);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      winstonLogger.error('An unknown error occurred');
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteRegionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await regionService.deleteRegionById(id);
    if (!result) {
      winstonLogger.info(STATUS.NOT_FOUND+' Region not found.');
      res.status(STATUS.NOT_FOUND).json({ message: 'Region not found' });
      return;
    }
    winstonLogger.debug(result);
    res.status(STATUS.OK).json({});
  } catch (error) {
    if (error instanceof Error) {
      winstonLogger.error(error.message);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      winstonLogger.error('An unknown error occurredr');
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
};

export const listRegions = async (req: Request, res: Response): Promise<void> => {
  try {
    const regions = await regionService.listRegions();
    winstonLogger.debug(regions);
    res.status(STATUS.OK).json(regions);
  } catch (error) {
    if (error instanceof Error) {
      winstonLogger.error(error.message);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      winstonLogger.error('Server error');
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
  }
};

export const listRegionsContainingPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const point = req.body.point; 
    const regions = await regionService.findRegionsContainingPoint(point);
    winstonLogger.debug(regions);
    res.status(STATUS.OK).json(regions);
  } catch (error) {
    if (error instanceof Error) {
      winstonLogger.error(error.message);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      winstonLogger.error('Server error');
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
  }
};

export const listRegionsNearPoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { point, distance } = req.body; 
    const regions = await regionService.findRegionsNearPoint(point, distance);
    winstonLogger.debug(regions);
    res.status(STATUS.OK).json(regions);
  } catch (error) {
    if (error instanceof Error) {
      winstonLogger.error(error.message);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      winstonLogger.error('Server error');
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
  }
};
