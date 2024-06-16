import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate
  const Logout = () => {
    setCookie("access_token", "")
    window.localStorage.removeItem("userId")
    navigate("/auth")
  }
  return (
    <div className="navbar">
      <Link to="/"> Home</Link>
      <Link to="/create-recipe"> CreateRecipe</Link>
      <Link to="/save-recipe"> SaveRecipe</Link>
      {!cookie.access_token ? (
        <Link to="/auth"> login/register</Link>
      ) : (
        <button onClick={Logout}>Logout</button>
      )}
    </div>
  );
};
