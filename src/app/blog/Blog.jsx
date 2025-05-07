import * as ReactRouter from "react-router-dom";
import PageWrapper from "@components/PageWrapper";
import Navbar from "@components/Navbar";
import React from "react";
import api from "@utils/FetchApi";

export default function BlogDetails() {
  const { id } = ReactRouter.useParams();
  const [blog, setBlog] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/api/v1/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!blog)
    return <p className="text-center mt-10 text-red-500">Blog not found.</p>;

  return (
    <>
      <Navbar />
      <PageWrapper className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {blog.title}
          </h1>
          <div className="text-sm text-gray-600">
            <span>
              By <strong>{blog.user?.full_name}</strong>
            </span>
            <span className="mx-2">·</span>
            <span>{blog.formatted_created_at}</span>
          </div>
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-[400px] object-cover rounded-xl shadow mb-6"
          />
        )}

        <div className="prose prose-lg max-w-none text-gray-800 mb-10">
          <p className="whitespace-pre-line">{blog.description}</p>
        </div>

        {blog.comments?.length > 0 && (
          <div className="border-t pt-6 mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Comments
            </h2>
            <ul className="space-y-4">
              {blog.comments.map((comment) => (
                <li
                  key={comment.id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <p className="text-gray-700">{comment.content}</p>
                  <span className="block text-xs text-gray-500 mt-1">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PageWrapper>
    </>
  );
}
