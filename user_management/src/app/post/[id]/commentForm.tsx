"use client";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";

const CommentForm = ({ postId }: { postId: string }) => {
    const [submitting, setSubmitting] = useState(false);
    const [content, setContent] = useState("");
    const { user } = useUser();

    if (!user) return null; 

    const handleSubmit = async () => {
        if (!content.trim()) return;
        setSubmitting(true);
        const res = await fetch("/api/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ postId, content }),
        });
        setSubmitting(false);

        if (res.ok) {
            setContent("");
            location.reload(); 
        } else {
            alert("Failed to submit comment");
        }
    };

    return (
        <div className="mt-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your comment..."
                className="w-full border border-gray-300 rounded px-3 py-2 h-24 mb-3 resize-none"
            />
            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
                {submitting ? "Submitting..." : "Submit Comment"}
            </button>
        </div>
    );
};

export default CommentForm;
