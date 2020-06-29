import { ILogDocument } from './logs.types';

export async function saveLog(this: ILogDocument): Promise<ILogDocument> {
    return await this.save();
}
