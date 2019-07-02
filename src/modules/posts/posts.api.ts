import express from 'express';
import httpStatus from 'http-status';

import { PostsRepo } from './posts.repo';

const router = express.Router();

router.post('/', async (req, res) => {
    const postRepo = new PostsRepo();
    const model = await postRepo.create(req.body);
    res.status(httpStatus.CREATED).json(model);
});

router.post('/getPostsFeed', async (req, res) => {
    const userId = req.body.userId;
    const friendsIds = req.body.friendsIds;

    const postRepo = new PostsRepo();

    const models = await postRepo.find(
        { $or: [{ author: userId }, { author: { $in: friendsIds } }] },
        { createdAt: 'desc' },
    );

    res.status(httpStatus.OK).json(models);
});

export { router };
