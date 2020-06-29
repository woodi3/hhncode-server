import { model } from 'mongoose';
import { IAdminDocument, IAdminModel } from './admins.types';
import AdminSchema from './admins.schema';
export const AdminModel = model<IAdminDocument>('admin', AdminSchema) as IAdminModel;
