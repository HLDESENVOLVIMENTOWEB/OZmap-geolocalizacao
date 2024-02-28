import { Types } from "mongoose";

export interface Region {
  _id?: Types.ObjectId | string;
  name: string;
}

export interface Point {
  latitude: number;
  longitude: number;
}