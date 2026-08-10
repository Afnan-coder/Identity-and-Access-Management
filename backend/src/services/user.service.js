import bcrypt from "bcrypt";
import { createUser } from "../repositories/user.repository.js";

const registerUser = async (userData) => {
    const { password } = userData;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser({
        ...userData,
        password: hashedPassword,
    });

    return user;
};

export {
    registerUser,
};