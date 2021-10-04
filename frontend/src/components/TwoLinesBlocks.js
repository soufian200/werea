import styled from "styled-components";
import { Container } from "../utils/styles";
import colors from "../constants/colors";
import Head from "./Head";
import { Link } from "react-router-dom";
import routes from "../constants/routes";
import size from "../constants/size";
import baseUrl from "../services/baseUrl";
import Empty from "./Empty";

// ------------------- styles -------------------------
const BooksBlock = styled.div`
  margin-top: 3rem;
  /* height: 50rem; */
`;

const Covers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  & > a {
    margin-left: 2.5rem;
    margin-bottom: 2.5rem;
    text-decoration: none;
    color: ${colors.primary};
  }
  @media (max-width: ${size.mobileL}) {
    justify-content: center;
  }
`;

const Cover = styled.div`
  width: ${({ small }) => (small ? "14rem" : "18rem")};
  height: ${({ small }) => (small ? "22rem" : "28rem")};
  overflow: hidden;
  border-radius: 1rem;
  background-color: ${colors.light};
  flex: 1;
  border: solid 0.1rem #ddd;

  & > img {
    width: 100%;
    height: 100%;
  }

  /* @media (max-width: ${size.mobileL}) {
    width: 18rem;
    height: 28rem;
  } */
  @media (max-width: ${size.tablet}) {
    width: 18rem;
    height: 28rem;
  }
`;

const Emptyf = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  font-size: 1.2rem;
  color: #adadad;
  & > svg {
    margin-right: 0.4rem;
    font-size: 1.9rem;
    font-size: 10rem;
  }
  & > p {
    font-weight: 600;
    text-transform: capitalize;
  }
`;

export default function TwoLineBooks({ title, items, hidemore, small }) {
  // console.log(items);
  return (
    <>
      <Container>
        <BooksBlock>
          <Head title={title} hidemore={hidemore} />
          <Covers>
            {items.length > 0 ? (
              items.map((i, index) => (
                <Link
                  key={index}
                  to={`${routes.BOOK}/${i.title.replaceAll(" ", "-")}`}
                  id='link'
                >
                  <Cover small={small}>
                  <img src={ i.cover} alt={i.title} />
                  </Cover>
                </Link>
              ))
            ) : (
              <Empty />
            )}
          </Covers>
        </BooksBlock>
      </Container>
    </>
  );
}
