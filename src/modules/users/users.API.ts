import express from 'express';

const router = express.Router();

router.post('/friendRequest', async (req, res) => {
    const { userId, targetUserId } = req.body;
});

router.post('/denyFriendRequest', async (req, res) => {});

router.post('/getFriendsAndFriendsRequests', async (req, res) => {});

router.post('/getNonFriends', async (req, res) => {});

export { router };
