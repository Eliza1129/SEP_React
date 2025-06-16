import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/service/user";

export async function POST(req: Request) {
    const user = await getUserFromToken();

    if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
    }
    
    const { content, postId } = await req.json();
    const comment = await prisma.comment.create({
        data: {
            content,
            postId,
            authorId: user.id,
        },
    });
    return NextResponse.json(comment);
}