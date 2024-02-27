import { Request, Response } from 'express';
import * as userService from '../services/useService'; 
import { STATUS } from '../types/Status';

import geocoder from '../geocoder/geocoderConfig';

const createUser = async (req: Request, res: Response) => {
  try {
    const { address, coordinates }: { name: string; email: string; address?: string; coordinates?: { lat: number; lng: number; } } = req.body;

    if ((address && coordinates) || (!address && !coordinates)) {
      res.status(400).send({ message: 'Please provide either an address or coordinates, but not both or neither.' });
      return;
    }

    let finalCoordinates = coordinates;
    if (address && !coordinates) {
      const geoResponse = await geocoder.geocode(address);
      if (geoResponse.length > 0) {
        finalCoordinates = { lat: Number(geoResponse[0].latitude), lng: Number(geoResponse[0].longitude) };
      } else {
        res.status(400).send({ message: 'Address not found.' });
        return;
      }
    }

    req.body.coordinates = finalCoordinates

    const user = await userService.createUser(req.body);
    res.status(STATUS.CREATED).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(STATUS.NOT_FOUND).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.updateUserById(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(STATUS.NOT_FOUND).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
};

const listUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await userService.listUsers(parseInt(page as string), parseInt(limit as string));
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
    }
  }
};

export { createUser, getUserById, updateUserById, listUsers };
