import { getAllPosts } from "@/lib/service/post";
import Link from "next/link";

export default async function PostsListPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const posts = await getAllPosts({
    authorId: undefined
  }); 

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      <ul className="space-y-6">
        {posts.map(post => (
          <li key={post.id} className="border-b pb-4">
            <Link href={`/post/${post.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">
              By {post.author.name} ·{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(post.createdAt))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
