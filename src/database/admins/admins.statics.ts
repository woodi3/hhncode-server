import { IAdminDocument, IAdminModel, Query, IAdmin } from './admins.types';

export async function getAdmin(this: IAdminModel, query: Query): Promise<IAdminDocument | null> {
    const record = await this.findOne(query);
    return record;
}

export async function createAdmin(this: IAdminModel, admin: IAdmin): Promise<IAdminDocument> {
    return await this.create(admin);
}
