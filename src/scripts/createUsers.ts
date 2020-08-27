import { connect, disconnect } from '../database';
import { IUser, IUserDocument } from '../database/users/users.types';
import UserService from '../services/user.service';

(async () => {
    const db = await connect();
    const userService = new UserService(db);
    const users: IUser[] = [
        {
            email: 'emma@gmail.com',
            name: 'Emma Bradley',
            password: '1234',
            notify: true,
            isAdmin: false,
            role: 'user',
            bookmarks: [],
        },
        {
            email: 'jack@gmail.com',
            name: 'Jack Turner',
            password: '1234',
            notify: true,
            isAdmin: false,
            role: 'user',
            bookmarks: [],
        },
        {
            email: 'alex@gmail.com',
            name: 'Alex Steed',
            password: '1234',
            notify: false,
            isAdmin: false,
            role: 'user',
            bookmarks: [],
        },
    ];

    try {
        for (const user of users) {
            await userService.save(<IUserDocument>user);
            console.log(`Created user ${user.name}`);
        }
        disconnect();
    } catch (e) {
        console.log(e);
    }
})();
