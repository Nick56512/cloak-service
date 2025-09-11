import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestHistoryDocument = RequestHistory & Document;

export enum SourceType {
  Bot = 'bot',
  User = 'user',
}

@Schema()
export class RequestHistory {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  userAgent: string;

  @Prop({ required: true, enum: SourceType, default: SourceType.User })
  sourceType: SourceType;

  @Prop()
  fingerprint?: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const RequestHistorySchema =
  SchemaFactory.createForClass(RequestHistory);
