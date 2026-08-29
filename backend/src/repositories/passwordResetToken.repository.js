import PasswordResetToken from "../models/PasswordResetToken.js";


const createPasswordResetToken = async (tokenData) => {
    return await PasswordResetToken.create(tokenData);
};


const findPasswordResetTokenByHash = async (tokenHash) => {
    return await PasswordResetToken.findOne({
        tokenHash,
    });
};


const markPasswordResetTokenAsUsed = async (tokenHash) => {
    return await PasswordResetToken.findOneAndUpdate(
        { tokenHash },
        { used: true },
        { new: true }
    );
};


export {
    createPasswordResetToken,
    findPasswordResetTokenByHash,
    markPasswordResetTokenAsUsed,
};