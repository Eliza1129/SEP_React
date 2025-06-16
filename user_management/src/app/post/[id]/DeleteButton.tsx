'use client';
import { useRouter } from "next/navigation";

export function DeleteButton({ postId }: { postId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const res = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/post'); 
    } else {
      alert('Delete failed!');
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-600 underline">
      Delete
    </button>
  );
}
