import React, { useState } from "react";
import "./UserLogin.css";
import Button from "../../Utils/Button/Button";
import Input from "../../Utils/Input/Input";

const UserLogin = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userAuthHandler = (event) => {
    event.preventDefault();
    if (props.isSignup) {
      fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          props.setAuth(data, props.type);
        })
        .catch((err) => {
          console.error(err);
        });
      return;
    }
    let url =
      props.type == "admin" ? "/api/admin/adminlogin" : "/api/users/login";
    console.log(url, { email, password });
    fetch("http://localhost:5000" + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.setAuth(data, props.type);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(
      `Name: ${name || "Login Mode"} Email: ${email} password: ${password}`
    );
  };

  return (
    <div className={"user__login"}>
      <h1>{props.heading}</h1>
      <form>
        {props.isSignup && (
          <Input
            htmlFor={"name"}
            id={"name"}
            label={"Name"}
            type={"name"}
            value={name}
            setFunction={setName}
          />
        )}
        <Input
          htmlFor={"email"}
          id={"email"}
          label={"Email"}
          type={"email"}
          value={email}
          setFunction={setEmail}
        />
        <Input
          htmlFor={"password"}
          id={"password"}
          label={"Password"}
          type={"password"}
          value={password}
          setFunction={setPassword}
        />
        <Button disabled={false} click={userAuthHandler} text={props.isSignup ? "Sign Up" : "Login"} />
      </form>
    </div>
  );
};

export default UserLogin;
