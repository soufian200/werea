import { useParams } from "react-router-dom";
import { Center, Container } from "../utils/styles";
import InputField from "./forms/InputField";
import { Formik, Form,  } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import Buttons from "./Buttons";
import SelectField from "./forms/SelectField";
import AreaField from "./forms/AreaField";
import useGetQuery from "../hooks/useGetCategories";
import routes from "../constants/routes";
import Loader from "./Loader";
import { isEmpty } from "../utils/funs";
import http from "../services/http";
import { useState, useRef } from "react";
import baseUrl from "../services/baseUrl";

const BookSchema = Yup.object().shape({
  title: Yup.string().min(2).max(150).required("Required"),
  author: Yup.string().min(2).max(150).required("Required"),
  pages: Yup.number().required("Required"),
  year: Yup.number().required("Required"),
  language: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  description: Yup.string().min(5).required("Required"),
  readlink: Yup.string().required("Required"),
  downloadlink: Yup.string().required("Required"),
});

const Bg = styled.div`
  background-color: white;
`;
const Title = styled.h1`
  text-transform: capitalize;
  color: #75b13f;
  & > p {
    display: inline-block;
    color: #111;
  }
`;
const OverLayer = styled.div`
  background-color: #eaeaea90;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* pointer-events: none; */
`;
const Errors = styled.ul`
  padding-top: 2rem;
  & li {
    color: red;
    font-size: 1.6rem;
  }
`;

export default function EditBook() {
  const { id } = useParams();
  const [l1, cats] = useGetQuery(`${routes.CATEGORIES}?g=true`);
  const [l2, book] = useGetQuery(`${routes.BOOK}?id=${id}`);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const errsRef = useRef();

  const cs =
    cats.length > 0
      ? [{ _id: "0", title: "category" }, ...cats]
      : [{ _id: "0", title: "category" }];

  const editBook = async (values) => {
    // console.log(values);
    try {
      setLoading(true);
       await http.put(
        `${baseUrl}${routes.BOOK}/edit/${id}`,
        values
      );

      setLoading(false);
      window.location.pathname = routes.SUP + routes.DASHBOARD + routes.H;
    } catch (ex) {
      setLoading(false);
      setErrors([...errors, ex.response.data.err]);
      errsRef.current.scrollIntoView({ behavior: "smooth" });
      //   console.log(ex);
    }
  };
  return (
    <Container>
      {l2 && (
        <Center>
          <Loader />
        </Center>
      )}
      {!isEmpty(book) && (
        <Bg>
          <Errors ref={errsRef}>
            {errors.map((i) => (
              <li>{i}</li>
            ))}
          </Errors>
          <Title>
            edit book <p>" {book["book"].title} "</p>
          </Title>
          {loading && (
            <OverLayer>
              <Loader />
            </OverLayer>
          )}
          <Formik
            initialValues={{
              title: book["book"].title,
              author: book["book"].author,
              pages: book["book"].pages,
              rate: book["book"].rate,
              year: book["book"].year,
              language: book["book"].language,
              category: book["book"].category,
              type: book["book"].type,
              description: book["book"].description,
              readlink: book["book"].readlink,
              downloadlink: book["book"].downloadlink,
            }}
            validationSchema={BookSchema}
            onSubmit={editBook}
          >
            {() => (
              <Form>
                <InputField
                  label='title'
                  name='title'
                  placeholder="Enter book's title"
                  labelHint='write a good title for the book'
                />

                <InputField
                  label='author'
                  name='author'
                  placeholder="Enter author's name"
                  labelHint="write Author's name of the book"
                />
                <InputField
                  label='rate'
                  name='rate'
                  placeholder="Enter book's rate"
                  labelHint='Enter rate'
                />
                <InputField
                  label='Pages Number'
                  name='pages'
                  placeholder='Enter pages number'
                  labelHint='write pages number of the book'
                />
                <InputField
                  label='Year Publish'
                  name='year'
                  placeholder='Enter year publish'
                  labelHint='write year publish of the book'
                />
                <InputField
                  label='Language'
                  name='language'
                  placeholder='write language  of the book'
                  labelHint="Enter language's book"
                />
                <SelectField
                  label='category'
                  name='category'
                  labelHint='select category of the book'
                  head='categories'
                  items={cs}
                />
                {l1 && "Loading..."}
                <SelectField
                  label='Type'
                  name='type'
                  labelHint='select type of the book'
                  head='Types'
                  items={[
                    { title: "type" },
                    { title: "book" },
                    { title: "novel" },
                    { title: "audio" },
                  ]}
                />
                <AreaField name='description' />
                <InputField
                  label='Read Link'
                  name='readlink'
                  placeholder='Enter read link'
                  labelHint='put read link for the book'
                />
                <InputField
                  label='download Link'
                  name='downloadlink'
                  placeholder='put download  link for the book'
                  labelHint='Enter download  link'
                />

                <Buttons />
              </Form>
            )}
          </Formik>
        </Bg>
      )}
    </Container>
  );
}
