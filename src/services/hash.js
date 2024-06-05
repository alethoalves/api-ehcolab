import bcrypt from 'bcryptjs';

export const hash = async (string) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(string, salt);
    return hashed; 
};

export const compare = async (plainText, hashedText) => {
    return await bcrypt.compare(plainText, hashedText);
};