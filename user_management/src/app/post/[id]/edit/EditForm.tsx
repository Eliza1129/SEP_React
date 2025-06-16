'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteButton } from "../DeleteButton";

export default function EditForm({ post }: { post: { id: string; title: string; content: string } }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/post/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push(`/post/${post.id}`);
    } else {
      alert('Update failed!');
    }
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Title:</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Content:</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded min-h-[120px]"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>

      <DeleteButton postId={post.id} />
    </form>
  );
}
