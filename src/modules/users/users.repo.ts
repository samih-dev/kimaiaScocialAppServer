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

        return rec;
    }

    async approveFriendRequest(userId: string, userIdToApprove: string) {
        await Friendship.findOneAndUpdate(
            { userAsked: this.toObjectId(userId), user: this.toObjectId(userIdToApprove) },
            { isApproved: true },
        );

        // update friendsList which will be used to fetch related firiends models on other collections like Posts, when needed.
        await User.findByIdAndUpdate(userId, { $push: { friendsIds: userIdToApprove } });
        await User.findByIdAndUpdate(userIdToApprove, { $push: { friendsIds: userId } });
    }

    async denyFriendRequest(userId: string, userIdToDeny: string) {
        await Friendship.remove({
            userAsked: this.toObjectId(userId),
            user: this.toObjectId(userIdToDeny),
        });
    }

    async getFriendsAndFriendsRequests(userId: string): Promise<IFriendship[]> {
        var recs = (await Friendship.find({
            $or: [{ user: this.toObjectId(userId) }, { userAsked: this.toObjectId(userId) }],
        })
            .populate('user')
            .populate('userAsked')) as IFriendship[];
        return recs;
    }

    async getNonFriends(userId: string, friendsIds: string[]): Promise<IUser[]> {
        var recs = (await User.find({
            $nin: [this.toObjectId(userId), ...friendsIds.map(this.toObjectId)],
        })) as IUser[];
        return recs;
    }
}
