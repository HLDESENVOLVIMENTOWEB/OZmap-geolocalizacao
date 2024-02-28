import { prop, getModelForClass, modelOptions, pre, Ref, Severity } from '@typegoose/typegoose';
import { User } from './userModel';
import { Schema } from 'mongoose';
import { Base } from '../types/Base';

@pre<Region>('save', async function(next) {
  // Pre-save logic here
})
@modelOptions({
  schemaOptions: {
    validateBeforeSave: true,
  },
  options: { allowMixed: Severity.ALLOW } 
})
export class Region extends Base {
  @prop({ required: true })
  public name!: string;

  @prop({
    required: true,
    type: Schema.Types.Mixed 
  })
  public geometry!: {
    type: 'Polygon',
    coordinates: number[][][];
  };

  @prop({ ref: 'User' }) 
  public user!: Ref<User>;
}

export const RegionModel = getModelForClass(Region);
