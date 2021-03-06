import { BaseRepo } from '../../repository';
import { IUser, User, Friendship, IFriendship } from './models';
import moment = require('moment');

export class UsersRepo extends BaseRepo<IUser> {
    constructor() {
        super(User);
    }

    async friendRequest(userId: string, userAskedId: string): Promise<IFriendship> {
        const friendShipModel = {
            isApproved: false,
            user: userId,
            userAsked: userAskedId,
            requestDate: moment().toDate(),
        } as IFriendship;

        const rec = (await Friendship.create(friendShipModel)) as IFriendship;

        // add to user document usersIdsWithRequest collection
        await User.findByIdAndUpdate(userId, { $push: { usersIdsWithRequest: userAskedId } });
        await User.findByIdAndUpdate(userAskedId, { $push: { usersIdsWithRequest: userId } });

        return rec;
    }

    async approveFriendRequest(userId: string, userIdToApprove: string) {
        await Friendship.findOneAndUpdate(
            { userAsked: this.toObjectId(userId), user: this.toObjectId(userIdToApprove) },
            { $set: { isApproved: true } },
        );

        // update friendsList which will be used to fetch related firiends models on other collections like Posts, when needed.
        await User.findByIdAndUpdate(userId, {
            $push: { friendsIds: userIdToApprove },
            $pull: { usersIdsWithRequest: userIdToApprove },
        });
        await User.findByIdAndUpdate(userIdToApprove, {
            $push: { friendsIds: userId },
            $pull: { usersIdsWithRequest: userId },
        });
    }

    async denyFriendRequest(userId: string, userIdToDeny: string) {
        await Friendship.deleteOne({
            userAsked: this.toObjectId(userId),
            user: this.toObjectId(userIdToDeny),
        });

        await User.findByIdAndUpdate(userId, {
            $pull: { usersIdsWithRequest: userIdToDeny },
        });
        await User.findByIdAndUpdate(userIdToDeny, {
            $pull: { usersIdsWithRequest: userId },
        });
    }

    async getFriendsAndFriendsRequests(userId: string): Promise<IFriendship[]> {
        var recs = (await Friendship.find({
            $or: [
                { $and: [{ user: this.toObjectId(userId) }, { isApproved: true }] },
                { userAsked: this.toObjectId(userId) },
            ],
        })
            .populate('user')
            .populate('userAsked')) as IFriendship[];
        return recs;
    }

    async getNonFriends(userId: string, idsToExclude: string[]): Promise<IUser[]> {
        var recs = (await User.find({
            _id: { $nin: [this.toObjectId(userId), ...idsToExclude.map(this.toObjectId)] },
        })) as IUser[];
        return recs;
    }
}
