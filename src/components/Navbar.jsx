import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/context/Auth";
import * as FormElements from "@components/FormElements";

const Navbar = () => {
  const { user, authenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[var(--primary-color)] shadow p-4 flex justify-between items-center h-[8vh]">
      <Link to="/" className="text-xl font-bold">
        VEGALOG
      </Link>
      <div className="flex items-center gap-2">
        {authenticated ? (
          <>
            <Link to={`/blogs/user/${user.id}`} className="w-[100px]">
              <FormElements.Button
                type="button"
                className="btn-sm"
                variant="primary"
              >
                My Blogs
              </FormElements.Button>
            </Link>
            <div className="w-[100px]">
              <FormElements.Button
                type="button"
                onClick={handleLogout}
                variant="secondary"
                className="btn-sm"
              >
                Logout
              </FormElements.Button>
            </div>

            <div className="p-2">
              {user.profile_img ? (
                <img
                  src={user.profile_img}
                  alt="User"
                  className="w-8 h-8 rounded-sm object-cover border-2 border-[var(--secondary-color)]"
                />
              ) : (
                <FormElements.Button type="button" className="btn-sm">
                  {user.full_name[0].toUpperCase()}
                </FormElements.Button>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <FormElements.Button
                type="button"
                variant="primary"
                className="btn-sm"
              >
                Login
              </FormElements.Button>
            </Link>
            <Link to="/register">
              <FormElements.Button
                type="button"
                variant="secondary"
                className="btn-sm"
              >
                Sign Up
              </FormElements.Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
