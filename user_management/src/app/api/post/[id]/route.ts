import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, content} = await request.json();

    const updatedPost = await prisma.post.update({
        where:{ id: params.id },
        data: {
          title,
          content,
        },
    });
    
    return NextResponse.json({ message: "Post Updated", post:updatedPost}, { status: 200});
  } catch(error){
    console.error("Update error", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Post deleted"}, { status: 200 });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}