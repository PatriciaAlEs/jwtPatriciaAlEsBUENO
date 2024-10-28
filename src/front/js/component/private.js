import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/allstyles.css";
import { useEffect } from "react";

const PrivateMenu = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logoutUser();
    navigate("/");
  };

  useEffect(() => {
    const validateAccess = async () => {
      const isValid = await actions.getPrivate();
      if (!isValid) {
        alert("No estás logueado");
        navigate("/");
      }
    };
    validateAccess();
  }, []);

  return (
    <div className="private-menu">
      <h2>Welcome to the Private Menu</h2>
      <ul>
        <li>
          <a>Profile</a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <div className="ml-auto">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </ul>
    </div>
  );
};

export default PrivateMenu;
