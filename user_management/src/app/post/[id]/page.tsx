import { getPostById } from "@/lib/service/post";
import CommentForm from "./commentForm";
import { getUserFromToken } from "@/lib/service/user";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";


// Format date string into readable format (e.g. Jun 12, 2025)
const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));

// This is the dynamic route page for a single post
export default async function PostDetailPage({ params }: { params: { id: string } }) {
  // Fetch the post and its comments using the post ID from the URL
  const post = await getPostById(params.id);

  // If no post is found, show a simple message
  if (!post) {
    return <div className="p-10 text-center text-gray-500">Post not found</div>;
  }

  const user = await getUserFromToken();
  const isAuthor = user?.id === post.author.id;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Post title */}
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

      {/* Post author and creation date */}
      <p className="text-sm text-gray-500 mb-4">
        by {post.author.name} · {formatDate(post.createdAt)}
      </p>

      {/* Post content */}
      <p className="mb-6 whitespace-pre-line">{post.content}</p>

      {/* Edit/Delete buttons for author */}
      {isAuthor && (
        <div className="flex gap-4 mb-4">
          <Link href={`/post/${post.id}/edit`} className="text-blue-600 underline">
            Edit
          </Link>
          <DeleteButton postId={post.id} />
        </div>
      )}
      {/* Comments section */}
      <h2 className="text-xl font-semibold mb-3">Comments</h2>
      
      {/* Display all comments related to the post */}
      <div className="space-y-4">
        {post.comments.length === 0 && (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
        {post.comments.map((comment) => (
          <div key={comment.id} className="border rounded p-3">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500 mt-1">
              — {comment.author.name}, {formatDate(comment.createdAt)}
            </p>
          </div>
        ))}
      </div>

      {/* Comment form for logged-in users */}
      <div className="mt-6">
        <CommentForm postId={post.id} />
      </div>
    </div>
  );
}
