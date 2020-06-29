import { connect, disconnect } from '../database';
import { ITag, ITagDocument } from '../database/tags/tags.types';
import TagService from '../services/tag.service';

(async () => {
    const db = await connect();
    const tagService = new TagService(db);
    const tags: ITag[] = [
        {
            text: 'Rap',
            color: 'crimson',
            description: 'Anything rap related.',
        },
        {
            text: 'Review',
            color: 'cyan',
            description: 'Anything that is a review.',
        },
        {
            text: 'Neo-Soul',
            color: 'darkviolet',
            description: 'Anything neo-soul related.',
        },
        {
            text: 'JavaScript',
            color: 'gold',
            description: 'Anything JavaScript related.',
        },
        {
            text: 'Angular',
            color: 'firebrick',
            description: 'Anything Angular related.',
        },
        {
            text: 'Vue',
            color: 'forestgreen',
            description: 'Anything Vue related.',
        },
        {
            text: 'CSS',
            color: 'lightskyblue',
            description: 'Anything CSS related.',
        },
    ];

    try {
        for (const tag of tags) {
            await tagService.save(<ITagDocument>tag);
            console.log(`Created tag ${tag.text}`);
        }
        disconnect();
    } catch (e) {
        console.log(e);
    }
})();
