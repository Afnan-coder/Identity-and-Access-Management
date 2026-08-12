import bcrypt from "bcrypt";
import {
    createUser,
    findUserByEmail,
} from "../repositories/user.repository.js";

const registerUser = async (userData) => {

    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(
        userData.password,
        12
    );

    const user = await createUser({
        ...userData,
        password: hashedPassword,
    });

    return user;
};

export {
    registerUser,
};