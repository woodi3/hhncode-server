import { Schema } from 'mongoose';
import { getAdmin, createAdmin as save } from './admins.statics';
import { createAdmin } from './admins.methods';
const AdminSchema = new Schema(
    {
        email: String,
        password: String,
        avatar: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
        },
    },
);

AdminSchema.statics.getAdmin = getAdmin;
AdminSchema.statics.createAdmin = save;
AdminSchema.methods.createAdmin = createAdmin;

export default AdminSchema;
