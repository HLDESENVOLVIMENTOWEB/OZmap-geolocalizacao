import 'reflect-metadata';

import * as mongoose from 'mongoose';
import {  Prop, Ref, getModelForClass, modelOptions, pre, prop} from '@typegoose/typegoose';
import lib from '../lib';

import ObjectId = mongoose.Types.ObjectId;
import { Base } from '../types/Base';

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
class User  extends Base {
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

@pre<Region>('save', async function (next) {
  const region = this as Omit<any, keyof Region> & Region;

  if (!region._id) {
    region._id = new ObjectId().toString();
  }

  if (region.isNew) {
    const user = await UserModel.findOne({ _id: region.user });
    if (!user) {
      throw new Error('User not found');
    } else {
      user.regions.push(region._id);
      await user.save({ session: region.$session() });
    }
  }

  next();
})
@modelOptions({ schemaOptions: { validateBeforeSave: false } })
export class Region extends Base {
  @Prop({ required: true, auto: true })
  _id: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ ref: () => User, required: true, type: () => String })
  user: Ref<User>;
}


export const UserModel = getModelForClass(User);
export const RegionModel = getModelForClass(Region);
