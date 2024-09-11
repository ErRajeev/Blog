import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseAuth } from "../../../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [term, setTerm] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleDateChange = (e) => setDob(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleTermChange = (e) => setTerm(e.target.checked);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      // console.log(response.user);
      if (response.user) {
        console.log("okkkkk");
        await sendEmailVerification(response.user);
        setMessage("Please check your email to verify your account!");

        setTimeout(() => {
          setMessage("");
          navigate("/Login");
        }, 5000);
      }
    } catch (error) {
      console.log(error.code);
      let newMessage = "Something went wrong. Please try again.";
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-email":
            newMessage = "Invalid email format.";
            break;
          case "auth/email-already-in-use":
            newMessage = "Email already in use.";
            break;
          case "auth/weak-password":
            newMessage = "Password should be at least 6 characters.";
            break;
          default:
            break;
        }
      }
      setError(newMessage);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex">
          {message && (
            <div className="alert alert-success">
              <p>{message}</p>
            </div>
          )}
          {error && (
            <div className="alert alert-success">
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
            <div className="card">
              <div className="card-body mx-2">
                <form
                  onSubmit={handleSignup}
                  className="form needs-validation"
                  noValidate
                >
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      id="name"
                      value={name}
                      required
                      onChange={handleNameChange}
                    />
                    <label htmlFor="name" className="form-label">
                      First Name
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      required
                      placeholder="Enter Email"
                      onChange={handleEmailChange}
                    />
                    <label htmlFor="email">Enter Email</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      placeholder="Enter Password"
                      required
                      onChange={handlePasswordChange}
                    />
                    <label htmlFor="password">Enter Password</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="date"
                      name="dob"
                      id="dob"
                      value={dob}
                      required
                      placeholder="Date of Birth"
                      onChange={handleDateChange}
                    />
                    <label htmlFor="dob">Date of Birth</label>
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-ratio ratio-16x9"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      placeholder="Male"
                      required
                      checked={gender === "male"}
                      onChange={handleGenderChange}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                      className="form-ratio"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      required
                      placeholder="Female"
                      checked={gender === "female"}
                      onChange={handleGenderChange}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div className="mb-3 form-floating">
                    <select
                      name="city"
                      id="city"
                      className="form-select"
                      value={city}
                      required
                      placeholder=""
                      onChange={handleCityChange}
                    >
                      <option value="">Please Choose</option>
                      <option value="Bettiah">Bettiah</option>
                      <option value="Patna">Patna</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    <label htmlFor="city">Enter City Name</label>
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-ratio"
                      type="checkbox"
                      name="term"
                      id="term"
                      required
                      placeholder=""
                      checked={term}
                      onChange={handleTermChange}
                    />
                    <label htmlFor="term">Agree with terms</label>
                  </div>

                  <div className="mb-3 d-flex justify-content-around">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <button type="reset" className="btn btn-secondary">
                      Reset
                    </button>
                    <Link to="/login">
                      <p className=" text-primary fs-4">😉Have an Account ?</p>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
