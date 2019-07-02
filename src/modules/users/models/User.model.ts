import mongoose, { Schema, mongo } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    friendsIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
    usersIdsWithRequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
});

interface IUser extends mongoose.Document {
    username: string;
    password: string;
}

const User = mongoose.model<IUser>('User', UserSchema, 'users');

export { User, IUser };
