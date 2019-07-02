import express from 'express';

import { UsersRepo } from './users.repo';

const router = express.Router();

router.post('/friendRequest', async (req, res) => {
    const { userId, userAsked } = req.body;

    const userRepo = new UsersRepo();

    await userRepo.friendRequest(userId, userAsked);

    res.status(httpStatus.CREATED).send();
});

router.post('/approveFriendRequest', async (req, res) => {
    const { userId, userIdToApprove } = req.body;

    const userRepo = new UsersRepo();

    await userRepo.approveFriendRequest(userId, userIdToApprove);

    res.status(httpStatus.OK).send();
});

router.post('/denyFriendRequest', async (req, res) => {
    const { userId, userIdToDeny } = req.body;

    const userRepo = new UsersRepo();

    await userRepo.denyFriendRequest(userId, userIdToDeny);

    res.status(httpStatus.NO_CONTENT).send();
});

router.post('/getFriendsAndFriendsRequests', async (req, res) => {
    const { userId } = req.body;

    const usersRepo = new UsersRepo();

    const friendsAndFriendsReqs = await usersRepo.getFriendsAndFriendsRequests(userId);

    res.status(httpStatus.OK).json(friendsAndFriendsReqs);
});

router.post('/getNonFriends', async (req, res) => {
    const { userId, friendsIds } = req.body;
    const userRepo = new UsersRepo();

    const nonFriendsList = await userRepo.getNonFriends(userId, friendsIds);

    res.status(httpStatus.OK).json(nonFriendsList);
});

export { router };
