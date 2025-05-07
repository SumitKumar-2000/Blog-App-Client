import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import PageWrapper from "@components/PageWrapper";
import api from "@utils/FetchApi";
import * as T from "@components/Table";
import * as FormElements from "@components/FormElements";

export default function ShowBlogByUser() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await api.get(`/api/v1/blogs/user/blog`);
      setBlogs(res.data);
    } catch (err) {
      console.log("fetch error: ", err);
      alert("Failed to fetch user blogs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`/api/v1/blogs/${blogId}`);
      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
      alert("Blog deleted successfully.");
    } catch (err) {
      console.log("delete error: ", err);
      alert("Failed to delete blog.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [id]);

  const tableHeads = [
    { title: "Title", attribute: "title" },
    { title: "Created At", attribute: "formatted_created_at" },
  ];

  return (
    <PageWrapper className={"p-4"}>
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold mb-4">Your Blogs</h1>
        <Link to={"/blogs/create"} className="w-[150px]">
          <FormElements.Button type="button" className="btn-sm">
            Create New
          </FormElements.Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <T.Table>
          <T.TableHeader>
            <T.TableRow>
              {tableHeads.map((head, i) => (
                <T.TableHead key={i}>{head.title}</T.TableHead>
              ))}
              <T.TableHead>Actions</T.TableHead>
            </T.TableRow>
          </T.TableHeader>
          <T.TableBody>
            {blogs.length > 0 ? (
              blogs.map((blog, i) => (
                <T.TableRow key={i}>
                  {tableHeads.map((head, j) => (
                    <T.TableCell key={j}>{blog[head.attribute]}</T.TableCell>
                  ))}
                  <T.TableCell className="flex gap-3">
                    <Link
                      to={`/blogs/edit/${blog.id}`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </T.TableCell>
                </T.TableRow>
              ))
            ) : (
              <T.TableRow>
                <T.TableCell
                  colSpan={tableHeads.length + 1}
                  className="text-center"
                >
                  No blogs found.
                </T.TableCell>
              </T.TableRow>
            )}
          </T.TableBody>
        </T.Table>
      )}
    </PageWrapper>
  );
}
