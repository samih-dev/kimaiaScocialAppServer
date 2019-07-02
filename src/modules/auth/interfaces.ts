import { IUser } from '../users';

export interface LoginOrRegisterResponse {
    created: boolean;
    token: string;
    user: IUser;
}
