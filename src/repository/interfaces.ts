import mongoose from 'mongoose';
export interface IWrite<T extends mongoose.Document> {
    create: (item: T) => Promise<T>;
    update(id: string, item: T): Promise<T>;
    delete(id: string): Promise<boolean>;
}

export interface IRead<T extends mongoose.Document> {
    getAll(): Promise<T[]>;
    find(cond: object): Promise<T[]>;
    findOne(cond: object): Promise<T>;
    findById(id: string): Promise<T>;
}
