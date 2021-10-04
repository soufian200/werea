import { Alert, Center } from "../../utils/styles";
import styled from "styled-components";
import colors from "../../constants/colors";
import AuthField from "./AuthField";
import {
  AiFillCloseCircle,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import AppForm from "./AppForm";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import http from "../../services/http";
import baseUrl from "../../services/baseUrl";
import routes from "../../constants/routes";

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
  username: Yup.string().max(100).required("username required"),
  email: Yup.string().email().max(100).required("email required"),
  password: Yup.string().min(2).max(150).required("password required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};
export default function Signup({ setLoading, setCreated }) {
  const [err, setErr] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await http.post(
        `${baseUrl}${routes.AUTH}${routes.SIGNUP}`,
        values
      );
      setCreated(data.msg);
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
    document.title = "Welcome to iread - Sign up";
  }, []);

  return (
    <>
      <h1>sgin up</h1>
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
          name='username'
          label='username'
          placeholder='Enter your username'
          Icon={AiOutlineUser}
          type='text'
        />
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
        <LoginBtn type='submit'>sign up</LoginBtn>
      </AppForm>
      <Cen>
        <Sign>
          i have an account ?
          <Link to={routes.SUP + routes.AUTH + routes.LOGIN}> login</Link>
        </Sign>
      </Cen>
      {redirect && <Redirect to={routes.SUP + routes.AUTH + routes.LOGIN} />}
    </>
  );
}
