"use client"
import { useState } from 'react';

export default function NewPost() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    // Post data to API or handle the post request
    console.log("Submitting:", content);
    // Redirect or notify on success
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded-lg"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          Post
        </button>
      </form>
    </div>
  );
}
