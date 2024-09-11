import React, { useContext, useEffect, useState } from "react";
import { FirebaseAuth } from "../../../FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleUpdate = () => {
    console.log("jbvhgh");
  };

  const handleSignout = () => {
    FirebaseAuth.signOut()
      .then(() => {
        console.log("Signout successfull");
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    console.log("ok");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    setEmail(user.email);
    setName(user.displayName || "");
    setCity(user.city || "");
  }, [user?.email]);

  return (
    <>
      <div className="container align-items-center mt-5">
        <div className="row">
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                className="form-control"
                placeholder="Enter Email"
                disabled
              />
              <label htmlFor="email" className="form-label">
                Your Email id
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name" className="form-label">
                Enter Name
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="city"
                id="city"
                className="form-control"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="city" className="form-label">
                Enter City
              </label>
            </div>
            <div className="d-flex justify-content-around mt-4">
              <button className="btn btn-primary " onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-primary " onClick={handleSignout}>
                Logout
              </button>
              <Link to="/signup">
                <p className=" text-primary fs-4">😉Create an Account ?</p>
              </Link>
            </div>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </>
  );
}

export default Profile;
