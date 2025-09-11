import { Injectable } from '@nestjs/common';
import { IModelRepository } from './imodel.repository';

import { Document, FilterQuery, UpdateQuery, Model } from 'mongoose';

@Injectable()
export class BaseRepository<T extends Document> implements IModelRepository<T> {
   constructor(private readonly model: Model<T>) {}

   create(model: Partial<T>): Promise<T> {
      const entity = new this.model(model);
      return entity.save();
   }
   findAll(filter: FilterQuery<T>): Promise<T[]> {
      return this.model.find(filter).exec();
   }
   findOne(filter: FilterQuery<T>): Promise<T | null> {
      return this.model.findOne(filter).exec();
   }
   update(
      filter: FilterQuery<T>,
      updateDto: UpdateQuery<T>,
   ): Promise<T | null> {
      return this.model.findOneAndUpdate(filter, updateDto, { new: true });
   }
   delete(filter: FilterQuery<T>): Promise<T | null> {
      return this.model.findOneAndDelete(filter);
   }
}
