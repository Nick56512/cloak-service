import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type RequestHistoryDocument = RequestHistory & Document;

@Schema()
export class RequestHistory {
  
  @Prop({ required: true, unique: true })
  ip: string;

  @Prop({ required: true })
  userAgent: string;

  @Prop()
  fingerprint?: string

  @Prop({ default: Date.now() })
  timestamp: Date;
}

export const RequestHistorySchema = SchemaFactory.createForClass(RequestHistory);
