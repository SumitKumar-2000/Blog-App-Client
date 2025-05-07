import React from "react";
import * as ReactRouter from "react-router-dom";
import api from "@utils/FetchApi";
import PageWrapper from "@/components/PageWrapper";
import * as FormElement from "@components/FormElements";
import { useAuth } from "@/lib/context/Auth";

const Login = () => {
  const navigate = ReactRouter.useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await api.post("/api/v1/auth/login", formData);
      login(res.user, res.token);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <PageWrapper height={"100vh"} className={"flex justify-center items-center p-4"}>
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
      </form>
    </PageWrapper>
  );
};

export default Login;
