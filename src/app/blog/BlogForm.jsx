import * as FormElement from "@components/FormElements";
import * as ReactRouter from "react-router-dom";
import PageWrapper from "@components/PageWrapper";
import React from "react";
import api from "@utils/FetchApi";

export default function BlogForm({ formType = "create" }) {
  const isEdit = formType === "edit";
  const navigate = ReactRouter.useNavigate();
  const { id } = ReactRouter.useParams();

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isEdit && id) {
      const fetchBlog = async () => {
        try {
          const res = await api.get(`/api/v1/blogs/${id}/user`);
          const blog = res.data;
          setFormData({
            title: blog.title,
            description: blog.description,
            image: null, 
          });
        } catch (err) {
          console.log("error: ", err)
          alert("Error fetching blog");
          navigate("/");
        }
      };
      fetchBlog();
    }
  }, [isEdit, id]);

  const handleChange = React.useCallback((e) => {
      const { name, value, files } = e.target;
  
      if (name === "image") {
        if (files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setFormData((prevData) => ({
              ...prevData,
              image: reader.result,
            }));
          };
        } else {
          setFormData((prevData) => ({
            ...prevData,
            image: null,
          }));
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    },
    [setFormData]
  );
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmedData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    }

    try {
      if (isEdit) {
        await api.patch(`/api/v1/blogs/${id}/user`, trimmedData);
        alert("Blog updated successfully");
      } else {
        await api.post("/api/v1/blogs", trimmedData);
        alert("Blog created successfully");
      }
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper height="100vh" className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="form max-w-xl w-full bg-white shadow-xl rounded-xl p-6"
        encType="multipart/form-data"
      >
        <h1 className="text-xl font-bold mb-4">{isEdit ? "Edit" : "Create"} Blog</h1>
        <FormElement.Input
          required
          type="text"
          name="title"
          placeholder="Title*"
          value={formData.title}
          disabled={loading}
          onChange={handleChange}
          className="input-sm"
        />

        <FormElement.Textarea
          required
          name="description"
          placeholder="Description*"
          rows={6}
          value={formData.description}
          disabled={loading}
          onChange={handleChange}
          className="input-sm"
        />

        <FormElement.Input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          disabled={loading}
          className="input-sm"
        />

        <FormElement.Button
          type="submit"
          className="btn-lg"
          loading={loading}
          disabled={loading}
        >
          {isEdit ? "Update" : "Create"} Blog
        </FormElement.Button>
      </form>
    </PageWrapper>
  );
}
