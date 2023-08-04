import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [values, setValues] = useState({
  //   name: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // });

  // //handle input
  // function handleChange(e) {
  //   const value = e.target.value;
  //   setValues({ ...values, [e.target.name]: value });
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("Please provide all fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastName,
        email,
        password,
      });

      dispatch(hideLoading());
      if (data.success) {
        toast.success("Registered successfully");
        navigate("/login");
      }
      // console.log(values);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid form details please try again");
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <form className="card p-2" onSubmit={handleSubmit}>
            <img
              src="/assests/logo.jpg"
              alt="Job Portal Image"
              height={120}
              width={400}
            />
            <InputForm
              htmlFor="name"
              labelText={"Name"}
              type={"text"}
              value={name}
              handleChange={(e) => setName(e.target.value)}
              name={"name"}
            />
            <InputForm
              htmlFor="lastName"
              labelText={"Last Name"}
              type={"text"}
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
              name={"lastName"}
            />
            <InputForm
              htmlFor="email"
              labelText={"Email"}
              type={"email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name={"email"}
            />
            <InputForm
              htmlFor="password"
              labelText={"Password"}
              type={"password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name={"password"}
            />

            <div className="d-flex justify-content-between">
              <p>
                Already Register <Link to="/login">Login</Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
