import { Center, Container } from "../utils/styles";
import Head from "./Head";
import styled from "styled-components";
import colors from "../constants/colors";
import routes from "../constants/routes";
import { Link } from "react-router-dom";
import size from "../constants/size";
import baseUrl from "../services/baseUrl";
import { useCallback, useEffect, useRef, useState } from "react";
import http from "../services/http";
import Loader from "./Loader";

const Covers = styled.div`
  /* background-color: red; */
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 10rem;
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;

  /* height: 50rem; */

  @media (max-width: ${size.mobileL}) {
    justify-content: center;
  }
`;

const Cover = styled.div`
  width: 16rem;
  height: 24rem;
  background: ${({ url }) => !url && colors.light};
  margin-left: 1.2rem;
  margin-top: 1.2rem;
  border-radius: 1rem;
  background-image: url(${({ url }) => url});
  background-size: cover;
  border: solid 0.1rem #ddd;
`;

export default function Explore() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const getExplore = async () => {
    try {
      setLoading(true);
      const { data } = await http.get(`${baseUrl}/explore?page=${page}`);
      setHasMore(data.items  && data.items.length > 0);
      setItems((prevbooks) => [...new Set([...prevbooks, ...data.items])]);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      // console.log(ex);
    }
  };

  /**
   * Observer for infinite scrolling
   * */
  const observer = useRef();
  const lastbookElementRef = useCallback(
    (node) => {
      // console.log(node);
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log("visible");
          setPage(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    getExplore();
  }, [page]);

  return (
    <Container>
      <Head title='explore' hidemore={true} />

      <Covers>
        {items.map((i, index) => {
          if (items.length === index + 1) {
            return (
              <Link
                key={index}
                to={`${routes.BOOK}/${(i.title || "").replaceAll(" ", "-")}`}
                id='link'
                ref={lastbookElementRef}
              >
                <Cover>
                <img src={ i.cover} alt={i.title} />
                </Cover>
              </Link>
            );
          } else {
            return (
              <Link
                key={index}
                to={`${routes.BOOK}/${(i.title || "").replaceAll(" ", "-")}`}
                id='link'
              >
                <Cover>
                  <img src={baseUrl + i.cover} alt="cover" />
                </Cover>
              </Link>
            );
          }
        })}

        {loading && (
          <Center>
            <Loader />
          </Center>
        )}
      </Covers>
    </Container>
  );
}
