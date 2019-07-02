import express from 'express';
import httpStatus from 'http-status';

import { PostsRepo } from './posts.repo';

const router = express.Router();

router.post('/', async (req, res) => {
    const postRepo = new PostsRepo();
    const model = await postRepo.create(req.body);
    const modelPopulated = await postRepo.getPostWithRelationsPopulated({
        id: model._id as string,
        relations: ['author'],
    });
    res.status(httpStatus.CREATED).json(modelPopulated);
});

router.post('/getPostsFeed', async (req, res) => {
    const userId = req.body.userId;
    const friendsIds = req.body.friendsIds;

    const postRepo = new PostsRepo();

    const models = await postRepo.getOwnAndFriendsPosts(userId, friendsIds);

    res.status(httpStatus.OK).json(models);
});

export { router };
