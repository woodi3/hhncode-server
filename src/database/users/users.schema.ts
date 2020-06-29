import { Schema } from 'mongoose';
import { getUser, getUsers, deleteUser, createUser, updateUser } from './users.statics';
import { saveUser, sameEmail } from './users.methods';
const UserSchema = new Schema(
    {
        email: String,
        name: String,
        password: String,
        notify: Boolean,
        isAdmin: Boolean,
        role: String,
        bookmarks: [String],
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

UserSchema.statics.getUser = getUser;
UserSchema.statics.getUsers = getUsers;
UserSchema.statics.deleteUser = deleteUser;
UserSchema.statics.createUser = createUser;
UserSchema.statics.updateUser = updateUser;
UserSchema.methods.saveUser = saveUser;
UserSchema.methods.sameEmail = sameEmail;

export default UserSchema;
