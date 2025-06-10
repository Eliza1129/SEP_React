'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
    id:string;
    name:string;
    email:string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/me', {
        credentials: 'include',
      }); 
      if (res.ok) {
        const data = await res.json();
        console.log("🐶 data from /me", data); 
        setUser(data);
      } else {
        router.push('/login'); 
      }
    }

    fetchUser();
  }, []);

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      
      <button 
        onClick={async () => {
          await fetch('/api/auth/logout', { method: 'POST'});
          router.push('/login');
        }}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          Logout
      </button>
    </div>
  );
}
