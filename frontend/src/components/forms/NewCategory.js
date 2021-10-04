import { useState } from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import { Formik, Form } from "formik";

import * as Yup from "yup";
import CategoryField from "./CategoryField";
import {
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import http from "../../services/http";
import routes from "../../constants/routes";
import baseUrl from "../../services/baseUrl";

const NewCat = styled.div`
  background-color: white;
  position: absolute;
  max-width: 60rem;
  width: 60rem;
  height: 50rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2rem;
  padding: 2rem;
  display: flex;

  & form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Save = styled.button`
  outline: 0;
  border: 0;
  padding: 1.4rem 6rem;
  background-color: ${colors.primary};
  color: white;
  border-radius: 0.8rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  text-transform: capitalize;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    opacity: 0.9;
  }

  :active {
    transform: scale(0.94);
  }
`;

const Close = styled.div`
  position: absolute;
  cursor: pointer;
  right: 2rem;
  & > svg {
    font-size: 3rem;
  }
`;

const Err = styled.p`
  color: white;
  margin-top: 2rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  background-color: #ff5757;
  padding: 1rem;
  border-radius: 0.4rem;
  & > svg {
    margin-right: 1rem;
  }
`;

const cSchema = Yup.object().shape({
  category: Yup.string().min(2).max(50).required("Required"),
});

export default function NewCategory({ setHide, setData, data }) {
  const [err, setErr] = useState("");
  const saveCategory = async (values) => {
    try {
      const { data: d } = await http.post(
        `${baseUrl}${routes.CATEGORIES}/add`,
        values
      );

      setData([...data, d.category]);
      setHide(true);
    } catch (ex) {
      setErr(ex.response.data.msg);
    }
  };
  return (
    <NewCat>
      <Close onClick={() => setHide(true)}>
        <AiOutlineCloseCircle />
      </Close>
      <Formik
        initialValues={{
          category: "",
        }}
        validationSchema={cSchema}
        onSubmit={saveCategory}
      >
        {({ errors, touched }) => (
          <Form>
            <CategoryField placeholder='Enter new category' name='category' />
            {err && (
              <Err>
                <AiOutlineExclamationCircle /> {err}
              </Err>
            )}
            <Save type='submit'>save</Save>
          </Form>
        )}
      </Formik>
    </NewCat>
  );
}
