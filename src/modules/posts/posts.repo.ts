import { BaseRepo } from '../../repository';
import { IPost, Post } from './models';

export class PostsRepo extends BaseRepo<IPost> {
    constructor() {
        super(Post);
    }

    async getPostWithRelationsPopulated({ id, relations = [] }: { id: string; relations: string[] }) {
        let query = Post.findById(id);

        relations.forEach(relation => (query = query.populate(relation)));

        const recs = await query.exec();
        return recs;
    }

    async getOwnAndFriendsPosts(userId: string, friendsIds: string[]): Promise<IPost[]> {
        const recs = (await Post.find({
            $or: [{ author: this.toObjectId(userId) }, { author: { $in: friendsIds.map(this.toObjectId) } }],
        })
            .populate('author')
            .sort({ createdAt: 'desc' })
            .exec()) as IPost[];

        return recs;
    }
}
