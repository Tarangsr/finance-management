import React from "react";

interface AuthButtonProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // Correct TypeScript type
}

const AuthButton: React.FC<AuthButtonProps> = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setIsAuthenticated(false); // Update state in Navbar
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default AuthButton;
