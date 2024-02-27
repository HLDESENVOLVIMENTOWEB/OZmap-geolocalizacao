import 'reflect-metadata';

import {  Ref, getModelForClass, pre, prop} from '@typegoose/typegoose';
import lib from '../lib';

import { Base } from '../types/Base';
import { Region } from './regionModal';

@pre<User>('save', async function (next) {
  try {
    const region = this as Omit<any, keyof User> & User;

    if (region.isModified('coordinates')) {
      region.address = await lib.getAddressFromCoordinates(region.coordinates);
    } else if (region.isModified('address')) {
      const { lat, lng } = await lib.getCoordinatesFromAddress(region.address);
      region.coordinates = [lng, lat];
    }

    next();
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    throw new Error(errorMessage);
  }  
})
export class User  extends Base {
  @prop({ required: true })
    name!: string;
  
    @prop({ required: true })
    email!: string;
  
    @prop({ required: true })
    address: string;
  
    @prop({ required: true, type: () => [Number] })
    coordinates: [number, number];
  
    @prop({ required: true, default: [], ref: () => Region, type: () => String })
    regions: Ref<Region>[];
}



export const UserModel = getModelForClass(User);