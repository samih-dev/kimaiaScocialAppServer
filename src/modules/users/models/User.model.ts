import mongoose, { Schema } from 'mongoose';

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
});

interface IUser extends mongoose.Document {
    username: string;
    password: string;
}

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
