import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RequestBlacklist {
   @Prop({ required: true })
   ip: string;

   @Prop({ required: true })
   userAgent: string;
}

export type RequestBlacklistDocument = RequestBlacklist & Document;

export const RequestBlacklistSchema =
   SchemaFactory.createForClass(RequestBlacklist);
