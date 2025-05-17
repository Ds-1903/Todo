import bcrypt from "bcrypt";

export const encryptPassword = (password: string) => {
    try {
        const hash = bcrypt.hashSync(password, 10)

        return {
            hashPassword: hash,
            success: true,
        }
    } catch (error) {
        return {
            hashPassword: null,
            success: false,
        }
    }
}