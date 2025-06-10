// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/service/user";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const user = await createUser(name, email, password);
    return NextResponse.json({ message: 'User created', user }, { status: 201 });

  } catch (error) {
    console.error("❌ Register Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
