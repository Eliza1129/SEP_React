import { getPostById } from "@/lib/service/post";
import { getUserFromToken } from "@/lib/service/user";
import { redirect } from "next/navigation";
import EditForm from "./EditForm";


export default async function EditPage({ params }: { params: { id: string } }) {
  const user = await getUserFromToken();
  const post = await getPostById(params.id);
  
  if (!post) {
    return <div className="text-center text-gray-500">Post not found</div>;
  }

  if( !user || user.id !== post.author.id){
    redirect('/post');
  }
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1  className="text-2xl font-bold mb-4">Edit Post</h1>
      <EditForm post={{ id: post.id, title: post.title, content: post.content }} />
    </div>
  )
}