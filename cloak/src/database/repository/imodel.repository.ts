import { Document, FilterQuery, UpdateQuery } from 'mongoose';

export interface IModelRepository<T extends Document> {
   create(model: Partial<T>): Promise<T>;
   findAll(filter: FilterQuery<T>): Promise<T[]>;
   findOne(filter: FilterQuery<T>): Promise<T | null>;
   update(filter: FilterQuery<T>, updateDto: UpdateQuery<T>): Promise<T | null>;
   delete(filter: FilterQuery<T>): Promise<T | null>;
}
