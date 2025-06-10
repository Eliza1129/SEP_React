import jwt, { SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export const signJwt = (payload: object, expiresIn: string = "7d") => {
    const options: SignOptions = { expiresIn: expiresIn } as SignOptions;
    return jwt.sign(payload, SECRET as string, options);
};

export const verifyJwt = (token: string) => {
    try {
        return jwt.verify(token, SECRET as string);
    } catch {
        return null;
    }
};
