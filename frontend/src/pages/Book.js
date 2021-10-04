import { useEffect, useState } from "react";
import About from "../components/About";
import BookHead from "../components/BookHead";
import { Container, Seperator } from "../utils/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../services/baseUrl";
import routes from "../constants/routes";
import LineBooks from "../components/LineBooks";

export default function Book() {
  const { title } = useParams();
  const [book, setBook] = useState([]);
  const [more, setMore] = useState([]);

  const getBook = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}${routes.BOOK}/${title}`);
      setBook(data.book);
      setMore(data.more);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        window.location.pathname = routes.NOTFOUND;
      }
    }
  };

  useEffect(() => {
    getBook();
    // console.log(book);
    window.scrollTo(0, 0);
  }, [title]);
  return (
    <>
      <BookHead item={book} />
      <Container>
        <Seperator mt={3} mb={4} />
      </Container>
      <About description={book.description} />
      <LineBooks title='more' hidemore={true} items={more} />
    </>
  );
}
