import { NextResponse } from "next/server";
import { createPost } from "@/lib/service/post";
import { getUserFromToken } from "@/lib/service/user";

export async function POST(request: Request) {
  try {
    // ✅ 1. Get current user from token
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ 2. Get data from request
    const { title, content } = await request.json();

    // ✅ 3. Validate input
    if (!title || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ 4. Create the post using logged-in user's ID
    const post = await createPost(title, content, { userId: user.id });

    return NextResponse.json({ message: "Post created", post }, { status: 201 });
  } catch (error) {
    console.error("❌ Post creation error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
