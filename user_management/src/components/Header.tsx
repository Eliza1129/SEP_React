'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';


const Header = () => {
  const pathname = usePathname();

  const router = useRouter();
  const { user, loading, setUser } = useUser();
  const linkClass = (href: string) => {
    return `hover:underline ${pathname === href ? 'font-bold underline' : ''}`;
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST'});
    setUser(null);
    router.push('/login');
  };

    if (loading) return null;

  return (
    <header className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">MyApp</Link>
      <nav className="flex gap-4">
        <Link href="/" className={linkClass('/')}>Home</Link>
        {user ? (
          <>
            <Link href="/post/new" className={linkClass("/post/new")} >
              New Post
            </Link>
            <Link href="/post" className={linkClass("/post")}>
              All Posts
            </Link>
            <Link href="/profile" className={linkClass('/profile')}>Profile</Link>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={linkClass('/login')}>Login</Link>
            <Link href="/register" className={linkClass('/register')}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;