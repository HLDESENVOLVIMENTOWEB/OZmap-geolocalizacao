import { Types } from "mongoose";

export interface Region {
  _id?: Types.ObjectId | string;
  name: string;
  geometry: { type: string; coordinates: number[][][]; };
  user: string;
}