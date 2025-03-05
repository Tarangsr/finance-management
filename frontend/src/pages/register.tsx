// register
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./auth.css"; // Common styles for login and registration

// const Register: React.FC = () => {
//   const [input, setInput] = useState({
//     name: "",
//     gender: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Registration Data:", input);
//     navigate("/login"); // Redirect to login after signup
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Full Name" value={input.name} onChange={handleChange} required />
//         <select name="gender" value={input.gender} onChange={handleChange} required>
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//         <input type="text" name="phone" placeholder="Phone Number" value={input.phone} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={input.email} onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" value={input.password} onChange={handleChange} required />
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>Already have an account? <span onClick={() => navigate("/login")}>Login</span></p>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";

const Register: React.FC = () => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    Email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", input);
      toast.success(response.data.message);
      localStorage.setItem("email", input.Email);
      navigate("/verify_otp");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstname" placeholder="First Name" value={input.firstname} onChange={handleChange} required />
        <input type="text" name="lastname" placeholder="Last Name" value={input.lastname} onChange={handleChange} required />
        <input type="email" name="Email" placeholder="Email" value={input.Email} onChange={handleChange} required />
        <input type="password" name="Password" placeholder="Password" value={input.Password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
      </form>
      <p>Already have an account? <span onClick={() => navigate("/login")}>Login</span></p>
    </div>
  );
};

export default Register;