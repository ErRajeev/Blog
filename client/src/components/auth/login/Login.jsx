import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FirebaseAuth } from "../../../../FirebaseConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      console.log(response.user.emailVerified);
      if (!response.user.emailVerified) {
        console.log("email not verified");
        setError("Please Verify Your Email");
        await sendEmailVerification(response.user);

        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      setMessage("Login Successful");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      let newMessage = "Something went wrong. Please try again.";
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-email":
            newMessage = "The email address is invalid.";
            break;
          case "auth/user-disabled":
            newMessage = "The user account has been disabled.";
            break;
          case "auth/user-not-found":
            newMessage = "No user found with this email.";
            break;
          case "auth/invalid-credential":
            newMessage = "invalid Email or password. Please try again.";
            break;
          case "auth/too-many-requests":
            newMessage = "Too many attempts. Please try again later.";
            break;
          default:
            break;
        }
      }
      setError(newMessage);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex">
          {message && (
            <div className="alert alert-success d-flex justify-content-center m-0">
              <p>{message}</p>
            </div>
          )}
          {error && (
            <div className="alert alert-danger d-flex justify-content-center">
              <p>{error}</p>
            </div>
          )}
          <div className="col-6 justify-content-center align-content-center">
            <h1 className="">Let’s Work Together</h1>
            <p>
              We would love to discuss your next project. Shoot us an email at
              support@sense7ai.com or fill out the form.
            </p>
          </div>
          <div className="col-6">
            <div className="card p-3">
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email" className="form-label">
                    Enter Email
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password" className="form-label">
                    Enter Password
                  </label>
                </div>
                <div className="d-flex justify-content-around mt-4">
                  <button type="submit" className="btn btn-primary ">
                    Login
                  </button>
                  <Link to="/signup">
                    <p className=" text-primary fs-4">😉Create an Account ?</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
