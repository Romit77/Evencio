"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      place: formData.get("place") as string | null,
      date: formData.get("date") as string | null,
      description: formData.get("description") as string,
      rewards: formData.get("rewards") as string | null,
      contactInfo: formData.get("contactInfo") as string | null,
    };

    try {
      const response = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { post } = await response.json();

        if (post && post.imageUrl) {
          setPosts((prevPosts) => [post, ...prevPosts]);
          e.currentTarget.reset();
        } else {
          console.error("Post is missing image URL:", post);
        }
      } else {
        console.error("Failed to generate post:", await response.json());
      }
    } catch (error) {
      console.error("Error during post generation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Social Media Posts
      </h1>

      <form onSubmit={handleSubmit} className="mb-10 max-w-2xl mx-auto">
        <input
          name="name"
          placeholder="Event Name"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          name="place"
          placeholder="Place (optional)"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          name="date"
          type="date"
          placeholder="Date (optional)"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          name="rewards"
          placeholder="Rewards (optional)"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          name="contactInfo"
          placeholder="Contact Info (optional)"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full ${
            isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-md`}
        >
          {isLoading ? "Generating..." : "Generate Post & Image"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-200 cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <h2 className="font-bold text-lg mb-2">
              {post.content?.slice(0, 20) || "Untitled"}...
            </h2>
            {post.imageUrl ? (
              <div className="relative w-full h-40">
                <Image
                  src={post.imageUrl}
                  alt="Poster"
                  width={400}
                  height={160}
                  className="w-full h-40 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-image.jpg";
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded">
                <p className="text-gray-500">Image unavailable</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No posts available. Create your first post!
          </p>
        </div>
      )}

      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4">
            <h2 className="font-bold text-2xl mb-4">
              {selectedPost.content?.slice(0, 20) || "Untitled"}...
            </h2>
            <p className="mb-4 text-gray-700">
              {selectedPost.content || "No content available"}
            </p>
            {selectedPost.imageUrl ? (
              <Image
                src={selectedPost.imageUrl}
                alt="Poster"
                width={400}
                height={224}
                className="w-full h-56 object-cover rounded mb-4"
                onError={(e) => {
                  // Fallback for image loading errors
                  (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                }}
              />
            ) : (
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded mb-4">
                <p className="text-gray-500">Image unavailable</p>
              </div>
            )}
            <button
              onClick={() => setSelectedPost(null)}
              className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
