import { IAdminDocument } from './admins.types';

export async function createAdmin(this: IAdminDocument): Promise<void> {
    await this.save();
}
