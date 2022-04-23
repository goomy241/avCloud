import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
// import logout from "./logout";

import axios from "axios";
import { login } from "../../features/autheticationfeature";

export default function LoginForm() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState();
  const [userProfile, setUserProfile] = useState();

  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      const loggedInUser = localStorage.getItem("user");

      if (loggedInUser) {
        setUserDetails(JSON.parse(loggedInUser));
        window.alert("Already logged in");
        history.push("/user/profile");
        //   navigate(-1);
      }
    };
  }, []);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setuser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);

    const response = login(user);
    if (response.status == 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      setUserProfile(response.data);
      console.log("Login Response", response);
      history.go(-1);
    } else {
      console.log("Unauthorized");
      console.log(response);
    }
  };

  //check if user is already logged in

  //If not then return this login form
  return (
    <>
      {userProfile ? (
        <Redirect
          to={{
            pathname: "/userprofile",
            state: userProfile,
          }}
        />
      ) : (
        <React.Fragment>
          <Row>
            <Col>
              <Card
                style={{
                  width: "35rem",
                  marginLeft: "25rem",
                  marginTop: "5rem",
                }}
              >
                {/* <Card.Img variant="top" src="" /> */}
                <Card.Header
                  style={{
                    textAlign: "center",
                    color: "green",
                    fontStyle: "italic",
                  }}
                >
                  Login
                </Card.Header>
                <Card.Body>
                  <form onSubmit={handleSubmit} onChange={handleChange}>
                    <Form.Group as={Row} className="mb-3">
                      {/* <Form.Label column sm="6"><div><h6>Login</h6></div></Form.Label> */}

                      <Form.Floating className="mb-3">
                        <Form.Control
                          type="email"
                          id="Email"
                          name="email"
                          placeholder="Email"
                          required
                        />
                        <label htmlFor="Email" style={{ marginLeft: 10 }}>
                          {" "}
                          Email
                        </label>
                      </Form.Floating>

                      <Form.Floating className="mb-3">
                        <Form.Control
                          type="password"
                          id="Password"
                          name="password"
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="Password" style={{ marginLeft: 10 }}>
                          {" "}
                          Password
                        </label>
                      </Form.Floating>
                    </Form.Group>
                    <Row>
                      <Col>
                        <Button
                          type="submit"
                          variant="success"
                          size="md"
                          active
                        >
                          Login
                        </Button>
                      </Col>
                      <Col>
                        {" "}
                        <Link
                          to="/register"
                          style={{ color: "green", fontStyle: "italic" }}
                        >
                          New User? Register
                        </Link>
                      </Col>
                    </Row>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <logout setUser={setuser}></logout>
        </React.Fragment>
      )}
    </>
  );
}