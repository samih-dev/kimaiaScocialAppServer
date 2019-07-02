import { IWrite, IRead } from './interfaces';
import mongoose from 'mongoose';

// that class only can be extended
export abstract class BaseRepo<T extends mongoose.Document> implements IWrite<T>, IRead<T> {
    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }
    async getAll(): Promise<T[]> {
        throw new Error('Method not implemented.');
    }
    async create(model: T): Promise<T> {
        const rec = (await this._model.create(model)) as T;
        return rec;
    }
    async update(id: string, item: T): Promise<T> {
        throw new Error('Method not implemented.');
    }
    async delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async find(cond: object, sortDesc: object | undefined = undefined): Promise<T[]> {
        const query = this._model.find(cond);
        if (sortDesc) {
            query.sort(sortDesc);
        }

        const recs = (await query.exec()) as T[];
        return recs;
    }
    async findById(id: string): Promise<T> {
        const rec = (await this._model.findById(id).exec()) as T;
        return rec;
    }

    async findOne(cond: object): Promise<T> {
        const rec = (await this._model.findOne(cond).exec()) as T;
        return rec;
    }

    protected toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}
