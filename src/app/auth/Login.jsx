import React from "react";
import * as ReactRouter from "react-router-dom";
import api from "@utils/FetchApi";
import PageWrapper from "@/components/PageWrapper";
import * as FormElement from "@components/FormElements";
import { useAuth } from "@/lib/context/Auth";

const Login = () => {
  const navigate = ReactRouter.useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const handleChange = React.useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  },[setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmedData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    try {
      const res = await api.post("/api/v1/auth/login", trimmedData);
      login(res.user, res.token);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-xl font-bold">LOGIN</h1>
        <FormElement.Input
          required
          type="email"
          name="email"
          disabled={loading}
          placeholder="Email*"
          className="input-sm"
          onChange={handleChange}
        />
        <FormElement.Input
          required
          type="password"
          name="password"
          disabled={loading}
          placeholder="Password*"
          className="input-sm"
          onChange={handleChange}
        />
        <FormElement.Button
          type="submit"
          className="btn-lg"
          loading={loading}
          disabled={loading}
        >
          Login
        </FormElement.Button>
        <p className="text-xs">
          Not a user -{" "}
          <strong className="hover:underline">
            <ReactRouter.Link to={"/register"}>Sign Up</ReactRouter.Link>
          </strong>
        </p>
      </form>
    </PageWrapper>
  );
};

export default Login;
