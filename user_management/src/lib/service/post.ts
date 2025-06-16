import { prisma } from "@/lib/prisma";

export const createPost = async(
  title: string, 
  content:string, 
  user: { userId: string}
) => {
  return await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.userId,
    },
    include: {
      author: true,
    }
  });
};

//without filerting
export const getAllPosts = async (p0?: { authorId: any; }) => {
  return await prisma.post.findMany({
    include:{
      author: true,
    },
    orderBy:{
      createdAt: 'desc',
    }
  });
}

//filter author
export const getPostsByAuthor = async (authorId: string) => {
  return await prisma.post.findMany({
    where: { authorId },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getPostById = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
        orderBy: {
           createdAt: 'desc'
        },
      },
    },
  });
} 
