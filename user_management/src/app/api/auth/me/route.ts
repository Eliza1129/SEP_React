import { getLoginToken } from "@/lib/auth/session";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const token = await getLoginToken();
    if (!token)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyJwt(token) as { userId: string } | null;
    if (!payload)
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, name: true, email: true },
    });
    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
}
