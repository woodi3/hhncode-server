import { ITagDocument } from './tags.types';

export async function saveTag(this: ITagDocument): Promise<ITagDocument> {
    return await this.save();
}
