import { BaseRepo } from '../../repository';
import { IPost, Post } from './models';

export class PostsRepo extends BaseRepo<IPost> {
    constructor() {
        super(Post);
    }
}
