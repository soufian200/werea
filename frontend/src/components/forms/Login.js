import { Alert, Center } from "../../utils/styles";
import styled from "styled-components";
import colors from "../../constants/colors";
import AuthField from "./AuthField";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineLock,
  AiOutlineMail,
} from "react-icons/ai";
import AppForm from "./AppForm";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import routes from "../../constants/routes";
import http from "../../services/http";
import baseUrl from "../../services/baseUrl";
import ls from "../../services/ls";

const LoginBtn = styled.button`
  outline: 0;
  border: 0;
  width: 100%;
  padding: 1.2rem 0;
  background-color: ${colors.primary};
  text-align: center;
  text-transform: capitalize;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: white;
  cursor: pointer;
  border-radius: 0.3rem;
  transition: 0.2s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    transform: scale(0.97);
  }
`;

const Sign = styled.div`
  text-transform: capitalize;

  & > a {
    font-size: 1.1rem;
    text-decoration: none;
    color: ${colors.red};

    :hover {
      text-decoration: underline;
    }
  }
`;

const Cen = styled(Center)`
  margin: 0;
`;

const schema = Yup.object().shape({
  email: Yup.string().email().max(100).required("email required"),
  password: Yup.string().min(2).max(150).required("password required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Errors = styled.ul`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  & li {
    color: red;
    font-size: 1.6rem;
  }
`;

export default function Login({ setLoading, created }) {
  const [err, setErr] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await http.post(
        `${baseUrl}${routes.AUTH}${routes.LOGIN}`,
        values
      );

      //  store token in local storeage
      ls.storeUser(data.token);
      setErr(null);
      setLoading(false);
      setRedirect(true);
    } catch (ex) {
      setLoading(false);
      if (ex.response.status === 400) {
        setErr(ex.response.data.err);
      }
    }
  };

  useEffect(() => {
    document.title = "Welcome to iread - Login";
  }, []);

  return (
    <>
      <h1>Login</h1>

      {created && (
        <Alert>
          <AiFillCheckCircle />
          <p>{created}</p>
        </Alert>
      )}

      {err && (
        <Alert bg={colors.redlight} color={colors.reddark}>
          <AiFillCloseCircle />
          <p>{err}</p>
        </Alert>
      )}

      <AppForm
        handleSubmit={handleSubmit}
        schema={schema}
        initialValues={initialValues}
      >
        <AuthField
          name='email'
          label='email'
          placeholder='Enter your email'
          Icon={AiOutlineMail}
          type='email'
        />
        <AuthField
          name='password'
          label='password'
          placeholder='Enter your password'
          Icon={AiOutlineLock}
          type='password'
        />
        <LoginBtn type='submit'>login</LoginBtn>
      </AppForm>
      <Cen>
        <Sign>
          i don't have an account ?{" "}
          <Link to={routes.SUP + routes.AUTH + routes.SIGNUP}> sign up</Link>
        </Sign>
      </Cen>
      {redirect && <Redirect to={routes.SUP + routes.DASHBOARD + routes.H} />}
    </>
  );
}
