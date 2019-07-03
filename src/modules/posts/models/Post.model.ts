import mongoose, { Schema } from 'mongoose';
import moment from 'moment-timezone';
import { IUser } from '../../users/models';

const PostSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}).pre('save', function(next) {
    const self = this as IPost;

    if (!self.createdAt) {
        self.createdAt = moment().toDate();
    }

    next();
});

interface IPost extends mongoose.Document {
    _id: string | undefined;
    createdAt: Date | undefined;
    body: string | undefined;
    author: string | IUser;
}

const Post = mongoose.model<IPost>('Post', PostSchema, 'posts');

export { Post, IPost };
