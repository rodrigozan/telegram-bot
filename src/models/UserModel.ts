import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.checkPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};


export const UserModel = mongoose.model('User', userSchema);
