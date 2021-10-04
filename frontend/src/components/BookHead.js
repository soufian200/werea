import { Center, Container } from "../utils/styles";
import styled from "styled-components";
import colors from "../constants/colors";
import {
  AiFillBook,
  AiOutlineDownload,
  AiOutlineStar,
} from "react-icons/ai";
import size from "../constants/size";
import Loader from "./Loader";
import baseUrl from "../services/baseUrl";
import routes from "../constants/routes";

const C = styled.div`
  flex: 1;
  @media (max-width: ${size.mobileL}) {
    width: 100%;
    /* background-color: red; */
    display: flex;
    justify-content: center;
  }
`;
const Cover = styled.div`
  width: 22rem;
  height: 34rem;
  overflow: hidden;
  border-radius: 1rem;
  background-color: ${colors.light};
  border: solid 0.1rem #ddd;

  /* flex: 1; */
  & > img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${size.mobileL}) {
    width: 33rem;
    height: 50rem;
  }
  /* @media (max-width: ${size.tablet}) {
    width: 18rem;
    height: 28rem;
  } */
`;
const Bh = styled.div`
  display: flex;
  margin: 2rem 0;
  padding: 2rem;
  justify-content: space-between;

  @media (max-width: 670px) {
    flex-direction: column;
  }
`;
const Ti = styled.div`
  /* background-color: red; */
  width: 20rem;
  flex: 3;
  & > table {
    margin-left: 2rem;
    /* width: 100%; */
  }
  & > table th,
  & > table td {
    font-size: 1.5rem;
    text-align: left;
    padding: 1rem;
  }
  & > table th {
    color: ${colors.gray1};
    padding-right: 5rem;
  }
  & > table td {
    color: ${colors.black};
    padding-left: 3rem;
    & h1 {
      font-size: 2.2rem;
      text-transform: capitalize;
    }
    & a {
      text-decoration: none;
      text-transform: capitalize;
      color: ${colors.primary};
    }
  }

  @media (max-width: 670px) {
    width: 100%;
    margin-top: 2rem;
  }
`;
const Bs = styled.div`
  flex: 1;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;
const B = styled.button`
  background: ${colors.primary};
  width: 100%;
  margin-top: 1rem;
  padding: 1.4rem 0;
  text-transform: capitalize;
  font-size: 1.5rem;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: 0.2s;
  border: 0;
  outline: 0;
  & svg {
    margin-right: 1rem;
    font-size: 2.2rem;
  }
  &:hover {
    opacity: 0.9;
  }
  :active {
    transform: scale(0.95);
  }
`;
const R = styled(B)`
  background: ${colors.red};
  position: relative;
  overflow: hidden;
  & input[value="download"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    outline: 0;
    opacity: 0;
    cursor: pointer;
  }
`;
const Rate = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    /* color: gold; */
    font-size: 2.1rem;
  }
  & b {
    font-size: 2.3rem;
    margin-left: 1rem;
  }
`;

export default function BookHead({ item }) {
  const {
    _id,
    title,
    cover,
    pdfPath,
    rate,
    size,
    author,
    category,
    pages,
    year,
    language,
  } = item;


  return (
    <>
      {!item.title ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Container>
          <Bh>
            <C>
              <Cover>
              <img src={ cover} alt={title} />
              </Cover>
            </C>
            <Ti>
              <table>
                <tr>
                  <th>Title</th>
                  <td>
                    <h1>{title}</h1>
                  </td>
                </tr>
                <tr>
                  <th>Author</th>
                  <td>{author}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>
                    <a href='#cat'># {category}</a>
                  </td>
                </tr>
                <tr>
                  <th>Pages</th>
                  <td>{pages}</td>
                </tr>
                <tr>
                  <th>published year</th>
                  <td>{year}</td>
                </tr>
                <tr>
                  <th>Language</th>
                  <td>{language}</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    {(size / 1024 / 1024 > 1
                      ? size / 1024 / 1024
                      : size / 1024
                    ).toFixed(2)}
                    {size / 1024 / 1024 > 1 ? " MB" : " KB"}
                  </td>
                </tr>
                <tr>
                  <th>Rate</th>
                  <td>
                    <Rate>
                      <AiOutlineStar />
                      <b>{rate} </b>
                    </Rate>
                  </td>
                </tr>
              </table>
            </Ti>
            <Bs>
              <B
                onClick={() => {
                  window.open( pdfPath);
                }}
              >
                <AiFillBook /> read
              </B>

              <R  onClick={() => {
                  window.open( pdfPath);
                }}>
                <AiOutlineDownload /> download
               
              </R>
            </Bs>
          </Bh>
        </Container>
      )}
    </>
  );
}
