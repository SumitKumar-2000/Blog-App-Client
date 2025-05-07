import { createBrowserRouter } from "react-router-dom";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import RequireAuth from "@/components/RequireAuth";
import Suspense from "@/components/SuspenseWrapper";
import React from "react";

const Blog = React.lazy(() => import("@/app/blog/Blog"));
const Login = React.lazy(() => import("@/app/auth/Login"));
const EditBlog = React.lazy(() => import("@/app/blog/EditBlog"));
const NotFound = React.lazy(() => import("@/app/notFound/NotFound"));
const Register = React.lazy(() => import("@/app/auth/Register"));
const ShowAllBlog = React.lazy(() => import("@/app/blog/ShowAllBlog"));
const ShowBlogByUser = React.lazy(() => import("@/app/blog/ShowBlogByUser"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <ShowAllBlog />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <RedirectIfAuthenticated>
          <Login />
        </RedirectIfAuthenticated>
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense>
        <RedirectIfAuthenticated>
          <Register />
        </RedirectIfAuthenticated>
      </Suspense>
    ),
  },
  {
    path: "/blogs",
    children: [
      {
        path: ":id",
        element: (
          <Suspense>
            <RequireAuth>
              <Blog />
            </RequireAuth>
          </Suspense>
        ),
      },
      {
        path: "create",
        element: (
          <Suspense>
            <RequireAuth>
              <Blog formType="create" />
            </RequireAuth>
          </Suspense>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <Suspense>
            <RequireAuth>
              <Blog formType="edit" />
            </RequireAuth>
          </Suspense>
        ),
      },
      {
        path: "user/:id",
        element: (
          <Suspense>
            <RequireAuth>
              <ShowBlogByUser />
            </RequireAuth>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
