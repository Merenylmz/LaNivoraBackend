import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: String,
    email: String,
    password: String,
    lastLoginToken?: String,
}

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    lastLoginToken: {type: String, nullable: true},
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;