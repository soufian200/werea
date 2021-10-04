import { Center, Container, Seperator } from "../utils/styles";
import styled from "styled-components";
import colors from "../constants/colors";
import routes from "../constants/routes";
import TwoLineBooks from "../components/TwoLinesBlocks";
import http from "../services/http";
import baseUrl from "../services/baseUrl";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const C = styled.div`
  margin: 3rem 0;
`;
const Title = styled.h1`
  font-size: 2rem;
  color: ${colors.black};
`;

const G = styled.div`
  margin-top: 3rem;
  /* background: red; */
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const TypeButton = styled.a`
  padding: 1.5rem 5rem;
  border-radius: 4rem;
  background-color: ${({ focused }) => (focused ? colors.black : "white")};
  color: ${({ focused }) => (focused ? "white" : colors.black)};
  text-decoration: none;
  text-transform: capitalize;
  font-size: 1.3rem;
  margin-right: 1rem;
  border: solid 0.2rem ${({ focused }) => (focused ? "white" : colors.black)};
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: ${colors.black};
  }
`;

const Ca = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const More = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;

  & > button {
    background: ${colors.primary};
    padding: 1.2rem 4rem;
    border: 0;
    outline: 0;
    cursor: pointer;
    border-radius: 0.5rem;
    text-transform: capitalize;
    font-size: 1.4rem;
    color: white;
    transition: 0.2rem;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const CatBtn = styled.a`
  text-decoration: none;
  text-transform: capitalize;
  font-size: 1.3rem;
  margin-right: 2rem;
  margin-top: 2rem;
  color: ${({ focused }) => (focused ? colors.primary : colors.black)};
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: ${colors.primary};
  }
  &:focus {
    color: ${colors.primary};
  }
`;

export default function Categories() {
  // const { type,category } = useParams();
  const [cats, setCats] = useState([]);
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("education");
  const [type, setType] = useState("book");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(2);
  const [stop, setStop] = useState(false);
  const [loading, setLoading] = useState(false);
  const types = ["book", "novel", "audio"];

  const getCats = async () => {
    try {
      const { data } = await http.get(`${baseUrl}${routes.CATEGORIES}?g=true`);
      setCats(data);
    } catch (ex) {
      // if (ex.response && ex.response.status === 404) {
      //   console.log("categories not found");
      // }
      alert(ex);
      // console.log(ex);
    }
  };
  const getBooks = async () => {
    // if (!stop) {
    try {
      setLoading(true);
      const { data } = await http.get(
        `${baseUrl}${routes.CATEGORIES}?c=${category}&t=${type}&skip=${skip}&limit=${limit}`
      );

      // console.log(data);
      if (data.length === 0) {
        setStop(true);
      }
      setBooks([...books, ...data]);
      setLoading(false);
      // console.log(data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("books cat not found");
      }
    }
    // }
  };

  function resetCatsState() {
    setStop(false);
    setPage(2);
    setSkip(0);
    setBooks([]);
  }

  useEffect(() => {
    getBooks();
  }, [category, type, page]);

  useEffect(() => {
    getCats();
  }, []);



  return (
    <>
      <Container>
        <C>
          <Title>Categories</Title>
        </C>
        <G>
          {types.map((i, index) => (
            <TypeButton
              focused={i === type}
              key={index}
              onClick={() => {
                resetCatsState();
                setType(i);
              }}
            >
              {i + "s"}
            </TypeButton>
          ))}
        </G>
        <Ca>
          {cats.length > 0 ? (
            cats.map((i, index) => (
              <CatBtn
                key={index}
                focused={i.title === category}
                onClick={() => {
                  resetCatsState();
                  setCategory(i.title);
                }}
              >
                # {i.title}
              </CatBtn>
            ))
          ) : (
            <Loader />
          )}
        </Ca>
        {/* <Container> */}
        <Seperator mt={5} mb={3} />
        {/* </Container> */}
      </Container>
      <TwoLineBooks
        title={category}
        hidemore={true}
        items={books}
        small={true}
      />
      <Container>
        {loading && (
          <Center>
            <Loader />
          </Center>
        )}

        {!loading && !stop && (
          <More
            onClick={() => {
              setPage(page + 1);
              setSkip(limit * (page - 1));
            }}
          >
            <button>show more</button>
          </More>
        )}
      </Container>
    </>
  );
}
