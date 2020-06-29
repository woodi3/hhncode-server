import { connect, disconnect } from '../database';

(async () => {
    const db = await connect();
    try {
        await db.UserModel.deleteMany({});

        console.log('Deleted all users');

        disconnect();
    } catch (e) {
        console.log(e);
    }
})();
