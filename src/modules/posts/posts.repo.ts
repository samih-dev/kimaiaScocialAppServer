import { BaseRepo } from '../../repository';
import { IPost, Post } from './models';

export class PostsRepo extends BaseRepo<IPost> {
    constructor() {
        super(Post);
    }

    async getOwnAndFriendsPosts(userId: string, friendsIds: string[]): Promise<IPost[]> {
        const recs = (await Post.find(
            { $or: [{ author: this.toObjectId(userId) }, { author: { $in: friendsIds.map(this.toObjectId) } }] },
            { createdAt: 'desc' },
        )) as IPost[];

        return recs;
    }
}
