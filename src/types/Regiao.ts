import { Types } from "mongoose";

// types.ts
export interface Region {
    _id?: Types.ObjectId | string;
    name: string;
  }
  
  export interface Point {
    latitude: number;
    longitude: number;
  }
  