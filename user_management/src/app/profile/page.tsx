
import { getAllPosts } from "@/lib/service/post";
import { getUserFromToken } from "@/lib/service/user";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const user = await getUserFromToken();  
    if (!user) redirect('/login');          

    const posts = await getAllPosts({ authorId: user.id }); 

    

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      {/* Create post button */}
      <div className="mt-6">
        <Link
          href="/post/new"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Post
        </Link>
      </div>

      {/* User's posts */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Your Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">You haven't written any posts yet.</p>
      ) : (
        <ul className="list-disc ml-6 space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>{" "}
              ({new Date(post.createdAt).toLocaleDateString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

