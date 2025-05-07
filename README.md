# Blog App – Client (React)

This is the **client-side** of a full-stack Blog Application built using **React**, **React Router**, and **Tailwind CSS**. It interacts with a Node.js + Sequelize + PostgreSQL backend.

The application allows users to:
- View all public blogs
- Register and login
- Create, edit, and delete their own blogs
- View blogs by a specific user
- View full details of a blog

---

## Routes Overview

The application uses **React Router** for managing page navigation and guards.

### ✅ Public Routes

| Path        | Component       | Description                      |
|-------------|------------------|----------------------------------|
| `/`         | `ShowAllBlog`    | Displays all public blogs        |
| `/login`    | `Login`          | User login form                  |
| `/register` | `Register`       | User registration form           |

- Wrapped with `RedirectIfAuthenticated` to redirect logged-in users.

---

### 🔐 Protected Routes (Require Authentication)

All routes under `/blogs/*` are wrapped in `RequireAuth` to ensure only logged-in users can access them.

| Path                   | Component         | Description                            |
|------------------------|------------------|----------------------------------------|
| `/blogs/:id`           | `Blog`           | View blog details by blog ID           |
| `/blogs/create`        | `Blog`           | Create a new blog                      |
| `/blogs/edit/:id`      | `Blog`           | Edit an existing blog (by blog ID)     |
| `/blogs/user/:id`      | `ShowBlogByUser` | Show all blogs written by specific user|

- `Blog` component supports `formType="create"` or `formType="edit"` props.

---

### 🚫 Fallback Route

| Path    | Component   | Description           |
|---------|-------------|-----------------------|
| `*`     | `NotFound`  | 404 - Page not found  |

---

## 🔧 Architecture Highlights

- **React Router v6+** for SPA routing and nested layouts
- **React.lazy & Suspense** for route-based code splitting
- **Protected routes** using `RequireAuth` component
- **Pagination** and **limit controls** on list views
- **Dynamic view** for blog details (including image, description, created by, etc.)

---

