// login
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./auth.css"; // Common styles for login and registration

// const Login: React.FC = () => {
//   const [input, setInput] = useState({ emailOrPhone: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Login Data:", input);
//     navigate("/"); // Redirect to homepage after login
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="emailOrPhone" placeholder="Email" value={input.emailOrPhone} onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" value={input.password} onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//       <p>Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span></p>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css"; // Common styles for login and registration

const Login: React.FC = () => {
  const [input, setInput] = useState({ Email: "", Password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        input,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data.token);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Login failed! Please check your credentials."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>} {}
      <form onSubmit={handleSubmit}>
        <input
          type="Email"
          name="Email"
          placeholder="Email"
          value={input.Email}
          onChange={handleChange}
          required
        />
        <input
          type="Password"
          name="Password"
          placeholder="Password"
          value={input.Password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/register")}>Sign up</span>
      </p>
    </div>
  );
};

export default Login;
