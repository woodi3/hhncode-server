import { connect, disconnect } from '../database';

(async () => {
    const db = await connect();
    try {
        await db.TagModel.deleteMany({});

        console.log('Deleted all tags');

        disconnect();
    } catch (e) {
        console.log(e);
    }
})();
