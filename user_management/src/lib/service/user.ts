import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (
    name: string,
    email: string,
    password: string
) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
};

export const verifyUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};

const JWT_SECRET = process.env.JWT_SECRET!; // 确保你在 .env 中设置了

export async function getUserFromToken() {
  // 1. Read token from HTTP-only cookie
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    // 2. Decode token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // 3. Find user in DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true }, // no password
    });

    return user;
  } catch (err) {
    console.error("JWT verification failed", err);
    return null;
  }
}
