import { useState } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { loginByEmail } from "../slices/authSlice";

const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [key, setKey] = useState("login");

  return (
    <div className="container w-50">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 "
      >
        <Tab eventKey="login" title="Login">
          <LoginForm dispatch={dispatch} login={loginByEmail} />
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <SignUpForm />
        </Tab>
      </Tabs>
    </div>
  );
};

const SignUpForm = () => {
  return (
    <>
      <Form className="d-grid gap-2">
        <Form.Group
          as={Col}
          md="12"
          className="mb-3"
          controlId="validationCustom01"
        >
          <Form.Label>Full name</Form.Label>
          <Form.Control required type="text" placeholder="Full name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          className="mb-3"
          controlId="validationCustom02"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Your Valid Email" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm Password"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" size="lg">
          Register
        </Button>
      </Form>
    </>
  );
};

const LoginForm = ({ dispatch, login }) => {
  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(login(signIn));
  };
  return (
    <Form className="d-grid gap-2">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={setSignIn.email}
          onChange={(e) => {
            setSignIn((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={setSignIn.password}
          onChange={(e) => {
            setSignIn((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        size="lg"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Login
      </Button>
    </Form>
  );
};

export default Login;
