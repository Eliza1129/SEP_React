'use client'

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect (() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null; 
  }

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    
    const res = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ title, content, authorId: user!.id}),
    });

    if (res.ok) {
      router.push('/post');
    } else {
      alert('Post failed!');
    }
  }
  return (
   <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
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
          Post
        </button>
      </form>
    </div>
  ); 
}