import { prop, getModelForClass, modelOptions, pre, Ref } from '@typegoose/typegoose';
import { User, UserModel } from './userModel';
import { Polygon } from 'geojson'; 
import { Base } from '../types/Base';

@pre<Region>('save', async function(next) {
  if (!this._id) {
  //  this._id = new Types.ObjectId(); 
  }

  if (this.isNew) {
    const user = await UserModel.findOne({ _id: this.user });
    if (!user) {
      throw new Error('User not found');
    } else {
      if (!user.regions) {
        user.regions = [];
      }
      user.regions.push(this._id); 
      await user.save();
    }
  }

  next();
})
@modelOptions({
  schemaOptions: {
    validateBeforeSave: true,
  }
})
export class Region extends Base {
  @prop({ required: true })
  public name!: string;

  @prop({
    required: true,
    _id: false, 
    type: () => Polygon 
  })
  public geometry!: Polygon; // Aqui, 'Polygon' é usado como um tipo

  @prop({ ref: () => User })
  public user!: Ref<User>;
}

export const RegionModel = getModelForClass(Region);
