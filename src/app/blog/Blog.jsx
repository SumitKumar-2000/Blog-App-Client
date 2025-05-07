import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "@components/PageWrapper";
import Navbar from "@components/Navbar";
import api from "@utils/FetchApi"; 

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/api/v1/blogs/${id}`);
        setBlog(res.data.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <>
      <Navbar />
      <PageWrapper className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        {blog.image_url && (
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full max-h-[400px] object-cover rounded-xl mb-6"
          />
        )}

        <div className="text-gray-600 text-sm mb-2">
          <p>
            By <span className="font-semibold">{blog.user?.full_name}</span> ·{" "}
            {blog.formatted_created_at}
          </p>
        </div>

        <div className="text-base text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.description}
        </div>
      </PageWrapper>
    </>
  );
}
