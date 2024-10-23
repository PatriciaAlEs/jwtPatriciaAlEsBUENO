import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/allstyles.css";

export const Navbar = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logoutUser();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/signup">
          <span className="navbar-brand mb-0 h1">Registro</span>
        </Link>
        <div className="ml-auto">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};
