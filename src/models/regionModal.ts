import 'reflect-metadata';

import * as mongoose from 'mongoose';
import {  Prop, Ref, getModelForClass, modelOptions, pre, prop} from '@typegoose/typegoose';

import ObjectId = mongoose.Types.ObjectId;
import { Base } from '../types/Base';
import { User, UserModel } from './userModel';


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


export const RegionModel = getModelForClass(Region);
