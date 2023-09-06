import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import TwitterLogo from "../styles/assets/twitter-logo.png";
import "../styles/login.css";
import { Link } from "react-router-dom";

const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

interface SignupValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [signup, { data }] = useMutation(SIGNUP_MUTATION);

  console.log("after signup data", data);

  const initialValues: SignupValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email Required"),
    password: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
    name: yup
      .string()
      .max(15, "Must be 15 characters or less")
      .required("Name Required"),
  });

  return (
    <div className="container">
      <img
        src={TwitterLogo}
        alt="logo"
        style={{ width: "50px" }}
        className="logo"
      />
      <h3>Sign up</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: values,
          });
          console.log("response after signup", response);
          localStorage.setItem("token", response.data.signup.token);
          setSubmitting(false);
          navigate("/");
        }}>
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={"div"} />
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component={"div"} />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={"div"} />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="confirmPassword" component={"div"} />
          <button type="submit" className="login-button">
            <span>Sign up</span>
          </button>
        </Form>
      </Formik>
      <div className="register">
        <h4>Already have an account?</h4>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
