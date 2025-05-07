import React, { useState } from "react";
import * as ReactRouter from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import api from "@utils/FetchApi";
import * as FormElement from "@components/FormElements";

export default function Register() {
  const navigate = ReactRouter.useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    password: "",
  });

  const handleChange = React.useCallback((e) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    },[setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/v1/auth/register", formData);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
    setLoading(true);
  };

  return (
    <PageWrapper
      height={"100vh"}
      className={"flex justify-center items-center p-4 relative"}
    >
      <ReactRouter.Link to={"/"} className="absolute right-4 top-4">
        <FormElement.Button className="btn-xs">Blogs</FormElement.Button>
      </ReactRouter.Link>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold">SIGN UP</h1>
        <FormElement.Input
          required
          type="text"
          name="full_name"
          className="input-sm"
          placeholder="Full Name*"
          disabled={loading}
          value={formData.full_name}
          onChange={handleChange}
        />
        <FormElement.Input
          required
          type="email"
          name="email"
          disabled={loading}
          placeholder="Email*"
          className="input-sm"
          value={formData.email}
          onChange={handleChange}
        />
        <FormElement.Input
          required
          type="password"
          name="password"
          disabled={loading}
          className="input-sm"
          placeholder="Password*"
          value={formData.password}
          onChange={handleChange}
        />
        <FormElement.Button
          type="submit"
          className="btn-lg"
          loading={loading}
          disabled={loading}
        >
          Register
        </FormElement.Button>
        <p className="text-xs">
          Alread a user -{" "}
          <strong className="hover:underline">
            <ReactRouter.Link to={"/login"}>Login</ReactRouter.Link>
          </strong>
        </p>
      </form>
    </PageWrapper>
  );
}
