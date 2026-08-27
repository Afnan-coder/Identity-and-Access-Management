import RefreshToken from "../models/RefreshToken.js";

const findRefreshTokenById = async (tokenId) => {
    return await RefreshToken.findById(tokenId);
};

const createRefreshToken = async (tokenData) => {
    return await RefreshToken.create(tokenData);
};

const findRefreshTokenByHash = async (tokenHash) => {
    return await RefreshToken.findOne({ tokenHash });
};

const revokeRefreshToken = async (tokenHash) => {
    return await RefreshToken.findOneAndUpdate(
        { tokenHash },
        { revoked: true },
        { new: true }
    );
};

export {
    createRefreshToken,
    findRefreshTokenByHash,
    revokeRefreshToken,
    findRefreshTokenById
};