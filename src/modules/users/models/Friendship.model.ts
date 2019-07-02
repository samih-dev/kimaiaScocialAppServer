import mongoose, { Schema } from 'mongoose';
import { IUser } from './User.model';

const FriendshipSchema = new Schema({
    isApproved: {
        type: Boolean,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userAsked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    requestDate: {
        type: Date,
    },
});

interface IFriendship extends mongoose.Document {
    _id: string;
    isApproved: boolean;
    user: string | IUser;
    userAsked: string | IUser;
    requestDate: Date;
}

const Friendship = mongoose.model<IFriendship>('Friendship', FriendshipSchema, 'friendships');

export { Friendship, IFriendship };
