import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class IpBlacklist {
    @Prop({ required: true, unique: true })
    ip: string
}

@Schema()
export class UserAgentBlacklist {
    @Prop({ required: true, unique: true })
    userAgent: string
}

export type IpBlacklistDocument =  IpBlacklist & Document
export type UserAgentBlacklistDocument = UserAgentBlacklist & Document

export const IpBlacklistSchema = SchemaFactory.createForClass(IpBlacklist)
export const UserAgentBlacklistSchema = SchemaFactory.createForClass(UserAgentBlacklist)