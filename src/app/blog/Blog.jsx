import * as FormElements from "@components/FormElements";
import * as ReactRouter from "react-router-dom";
import PageWrapper from "@components/PageWrapper";
import { useAuth } from "@/lib/context/Auth";
import Navbar from "@components/Navbar";
import React from "react";
import api from "@utils/FetchApi";
import CommentPost from "@/components/CommentPost";
import PageLoader from "@/components/PageLoader";

export default function BlogDetails() {
  const { id } = ReactRouter.useParams();
  const { authenticated } = useAuth();
  const [blog, setBlog] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [comment, setComment] = React.useState("");
  const [postingComment, setPostingComment] = React.useState(false);

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

  const postComment = async () => {
    setPostingComment(true);

    try {
      await api.post(`/api/v1/comments/blog/${id}`, {
        content: comment.trim(),
      });
      setComment("");
      const res = await api.get(`/api/v1/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setPostingComment(false);
    }
  };

  if (loading) return <PageLoader/>;

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

        <div className="prose prose-lg max-w-none text-gray-800 mb-8">
          <p className="whitespace-pre-line">{blog.description}</p>
        </div>
        <hr />
        {authenticated ? (
          <div className="flex gap-2 mt-4">
            <FormElements.Input
              type="text"
              name="comment"
              value={comment}
              disabled={postingComment}
              placeholder="Comment Something"
              className="input-sm flex-8"
              onChange={(e) => setComment(e.target.value)}
            />
            <FormElements.Button
              type="button"
              variant="primary"
              disabled={postingComment}
              onClick={postComment}
              className="btn-sm flex-2"
            >
              Post
            </FormElements.Button>
          </div>
        ) : null}

        {blog.comments?.length > 0 && (
          <div className="mt-4">
            <ul className="space-y-2">
              {blog.comments.map((comment) => (
                <CommentPost comment={comment} />
              ))}
            </ul>
          </div>
        )}
      </PageWrapper>
    </>
  );
}
