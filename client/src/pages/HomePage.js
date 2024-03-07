import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/posts?page=${page}`);
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4">Melody Verse</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))}
        </div>
        {loading && (
          <p className="text-gray-500 text-center mt-4">Loading...</p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
