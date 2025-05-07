import { FaEdit, FaTrash } from "react-icons/fa";
import * as FormElements from "@components/FormElements";
import * as ReactRouter from "react-router-dom";
import PageWrapper from "@components/PageWrapper";
import * as T from "@components/Table";
import React from "react";
import api from "@utils/FetchApi";

export default function ShowBlogByUser() {
  const { id } = ReactRouter.useParams();
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
      await api.delete(`/api/v1/blogs/${blogId}/user`);
      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
      alert("Blog deleted successfully.");
    } catch (err) {
      console.log("delete error: ", err);
      alert("Failed to delete blog.");
    }
  };

  React.useEffect(() => {
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
        <div className="flex gap-2">
          <ReactRouter.Link to={"/blogs/create"} className="w-[100px]">
            <FormElements.Button type="button" className="btn-sm">
              Create New
            </FormElements.Button>
          </ReactRouter.Link>
          <ReactRouter.Link to={"/"} className="w-[100px]">
            <FormElements.Button type="button" variant="secondary" className="btn-sm">
              Home
            </FormElements.Button>
          </ReactRouter.Link>
        </div>
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
                  {tableHeads.map((head, j) => {
                    let value = blog[head.attribute];
                    if (typeof value === "string" && value.length > 30) {
                      value = value.substring(0, 30) + "...";
                    }
                    return <T.TableCell key={j}>{value}</T.TableCell>;
                  })}
                  <T.TableCell className="flex gap-3">
                    <ReactRouter.Link
                      to={`/blogs/edit/${blog.id}`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </ReactRouter.Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
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
