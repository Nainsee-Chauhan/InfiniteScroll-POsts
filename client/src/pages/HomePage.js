import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10; // Number of posts to fetch per page
  const loader = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/posts?page=${page}&pageSize=${pageSize}`
        );
        const newPosts = response.data;

        // Fetch content for the new posts
        const postsWithContent = await Promise.all(
          newPosts.map(async (post) => {
            const contentResponse = await axios.get(post.content);
            const content = contentResponse.data;

            return { ...post, content };
          })
        );

        // Update the state with new posts and their content
        setPosts((prevPosts) => [...prevPosts, ...postsWithContent]);
      } catch (error) {
        setError("Error fetching posts");
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4  ">
        <h2 className="text-3xl font-bold text-white mb-8">Post List</h2>
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-blue-950 shadow-md rounded-lg mb-6 p-6"
          >
            <h3 className="text-white text-2xl font-semibold mb-4">
              {post.title}
            </h3>
            <img
              className="object-cover w-full h-72 mb-4 rounded-md"
              src={post.imageUrl}
              alt={post.title}
            />
            <p className="text-white text-lg leading-relaxed mb-4">
              {post.content.quote}
            </p>
            <p className="text-white">Author: {post.content.author}</p>
            <p className="text-white mt-2">
              Created At: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        {loading && (
          <div className="flex items-center justify-center mt-8">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 border-t-blue-500 h-10 w-10 mr-2"></div>
            <p className="text-gray-500 text-xl">Loading...</p>
          </div>
        )}
        {error && <p className="text-red-500 text-lg mt-8">{error}</p>}
        <div ref={loader}></div>
      </div>
    </Layout>
  );
};

export default Home;
