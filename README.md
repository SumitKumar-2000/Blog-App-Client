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

## Snips
# Login Page
<img width="932" alt="image" src="https://github.com/user-attachments/assets/2281a9e4-79d7-4f33-82b9-e0bc127bfee5" />

# Register Page
<img width="947" alt="image" src="https://github.com/user-attachments/assets/145c21c1-ba8e-4b5f-8f12-de45638eb3ec" />

# All Blogs ( Table Format )
<img width="959" alt="image" src="https://github.com/user-attachments/assets/37ddf3c1-0a12-4bf6-b640-79888715f23d" />

# Particular Blog page
<img width="952" alt="image" src="https://github.com/user-attachments/assets/594cd4c5-ceba-4d2e-9cf4-63e1e7ed5d09" />

# Blog By user
<img width="947" alt="image" src="https://github.com/user-attachments/assets/ef72356d-d65b-4509-9f3c-2d1dd6c5ce1a" />

# Blog Creation
<img width="676" alt="image" src="https://github.com/user-attachments/assets/6d2211b6-9665-4deb-aa65-b35ce851847f" />

# Blog Updation
<img width="699" alt="image" src="https://github.com/user-attachments/assets/a41f8726-809c-4ca2-8758-e8ca50455686" />

# Comment Feature
<img width="544" alt="image" src="https://github.com/user-attachments/assets/710c515b-7e8c-4db1-a8b1-065cd96472c2" />



