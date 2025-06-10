import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/service/user";
import { signJwt } from "@/lib/jwt";
import { setLoginCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    if (!email || !password) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await verifyUser(email, password);
    if (!user) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    const token = signJwt({ userId: user.id });
    await setLoginCookie(token);
    return NextResponse.json({ success: true, user });
}
