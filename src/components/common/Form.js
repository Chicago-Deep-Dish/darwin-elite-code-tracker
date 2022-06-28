/* eslint-disable no-unused-vars */

//Modules
// import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Styling
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import useGlobalContext from "../../context/GlobalContext";

//Firebase
import axios from "axios";

export default function Form({ modalName, setModal, handleExitModal }) {
  const { toastifyTheme } = useGlobalContext();

  //------ FIREBASE ------//

  const [loginValues, setLogin] = useState({
    email: "",
    password: "",
    showPassword: false,
    userLoggedIn: false,
  });

  const handleClickSubmit = () => {
    console.log("email:", loginValues.email);
    console.log("Password:", loginValues.password);

    if (modalName === "LOGIN") {
      //TODO: add userAccountIcon show up on successful login
      axios
        .get("/users/login", {
          params: {
            email: loginValues.email,
            password: loginValues.password,
          },
        })
        .then(({ data }) => {
          const token = data._tokenResponse.refreshToken;
          console.log("token:", token);

          setLogin({ ...loginValues, userLoggedIn: true });
          handleExitModal(null, "exit");
          setModal({ modalName: null });
          toast.success("User Logged In Successfully", toastifyTheme);
          sessionStorage.setItem("Auth Token", token);
        })
        .catch((error) => {
          console.log(error);
          const code = error.response.data.code;
          if (code === "auth/wrong-password") {
            toast.error(
              "Password may have been incorrect, please check and try again",
              toastifyTheme
            );
          } else if (code === "auth/user-not-found") {
            toast.error("Invalid Email, try again", toastifyTheme);
          } else if (code === "auth/too-many-requests") {
            toast.error(
              "Too Many requests. Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. ",
              toastifyTheme
            );
          } else {
            console.log("not getting the right error code...");
          }
        });
    }
    if (modalName === "REGISTER") {
      axios
        .get("/users/register", {
          params: {
            email: loginValues.email,
            password: loginValues.password,
          },
        })
        .then(({ data }) => {
          console.log("REGISTER data:", data);
          const token = data._tokenResponse.refreshToken;

          handleExitModal(null, "exit");
          setModal({ modalName: "empty" });
          toast.success("User Created Successfully", toastifyTheme);
          sessionStorage.setItem("Auth Token", token);
        })
        .catch((error) => {
          console.log(error);
          const code = error.response.data.code;
          if (code === "auth/email-already-in-use") {
            toast.error("Email Already in Use", toastifyTheme);
          } else {
            console.log("not getting the right error code...");
          }
        });
    }
  };

  const handleChange = (prop) => (event) => {
    setLogin({ ...loginValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setLogin({
      ...loginValues,
      showPassword: !loginValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FormControl
        sx={{ backgroundColor: "primary.light", m: 1, width: "40ch" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          value={loginValues.email}
          onChange={handleChange("email")}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleExitModal(null, "exit");
            }
          }}
          label="Password"
        />
      </FormControl>
      <FormControl
        sx={{
          backgroundColor: "white",
          m: 1,
          width: "40ch",
        }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          sx={{
            backgroundColor: "white",
          }}
          id="outlined-adornment-password"
          type={loginValues.showPassword ? "text" : "password"}
          value={loginValues.password}
          onChange={handleChange("password")}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleClickSubmit();
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <Button
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {loginValues.showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button type="submit" onClick={handleClickSubmit}>
        {modalName}
      </Button>
    </div>
  );
}
