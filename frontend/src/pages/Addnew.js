import { useEffect, useRef, useState } from "react";
import InputField from "../components/forms/InputField";
import { Container } from "../utils/styles";
import styled from "styled-components";
import UploadCover from "../components/forms/UploadCover";
import SelectField from "../components/forms/SelectField";
import AreaField from "../components/forms/AreaField";
import Loader from "../components/Loader";
import size from "../constants/size";
import Buttons from "../components/Buttons";
import { Formik, Form, } from "formik";
import * as Yup from "yup";
import baseUrl from "../services/baseUrl";
import routes from "../constants/routes";
import http from "../services/http";
import PdfUploader from "../components/forms/PdfUploader";

const Formpar = styled.div`
  margin-bottom: 4rem;
  background-color: white;
  /* @media (max-width: ${size.mobileL}) {
    margin-left: 0rem;
  } */
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

const BookSchema = Yup.object().shape({
  title: Yup.string().min(2).max(150).required("Required"),
  author: Yup.string().min(2).max(150).required("Required"),
  pages: Yup.number().required("Required"),
  year: Yup.number().required("Required"),
  language: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  description: Yup.string().min(5).required("Required"),
});

export default function Addnew() {
  const [loader, setLoader] = useState(false);
  const [sent, setSent] = useState(false);
  const [cats, setCats] = useState([]);
  const [errors, setErrors] = useState([]);
  const [coverurl, setCoverurl] = useState();
  const [pathPdfFile, setPathPdfFile] = useState();
  const [pdfSize, setPdfSize] = useState();
  const errsRef = useRef();

  const bookInitValues = {
    title: "",
    author: "",
    pages: "",
    rate: "",
    year: "",
    language: "",
    category: "",
    type: "",
    description: "",
  };

 

  const addNewBook = async (values) => {
    // same shape as initial values

    try {
      setLoader(true);

       await http.post(`${baseUrl}${routes.BOOK}/new`, {
        ...values,
        pdfPath: pathPdfFile,
        cover: coverurl,
        size: pdfSize,
      });

      setLoader(false);
      // redirect to dash board
      setCoverurl(null);
      setSent(true);
      return window.location.replace(routes.SUP + routes.DASHBOARD + routes.P);
    } catch (ex) {
      // alert(ex.response.data.err);
      setErrors([ex.response.data.err]);
      errsRef.current.scrollIntoView({ behavior: "smooth" });
      setLoader(false);
    }
  };

  useEffect(() => {
    // setCoverurl(null);
    const getCats = async () => {
      try {
    
        const { data } = await http.get(`${baseUrl}${routes.CATEGORIES}?g=true`);
        setCats(data);
      } catch (ex) {
        // if (ex.response && ex.response.status === 404) {
        //   console.log("categories not found");
        // }
      }
    };

    getCats();

    

  }, []);
  return (
    <>
      <Container>
        <Formpar>
          <Formik
            initialValues={bookInitValues}
            validationSchema={BookSchema}
            onSubmit={addNewBook}
          >
            {() => (
              <Form encType='multipart/form-data'>
             
                <Errors ref={errsRef}>
                  {errors.map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </Errors>
                <UploadCover
                  name='cover'
                  setCoverurl={setCoverurl}
                  coverurl={coverurl}
                />
                <PdfUploader
                  setPathPdfFile={setPathPdfFile}
                  setPdfSize={setPdfSize}
                />
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
                  items={[{ title: "category" }, ...cats]}
                />
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

                <Buttons />
              </Form>
            )}
          </Formik>
        </Formpar>
      </Container>
      {loader && (
        <OverLayer>
          <Loader />
        </OverLayer>
      )}
    </>
  );
}
