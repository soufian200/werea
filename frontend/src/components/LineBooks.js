import styled from "styled-components";
import {  Container } from "../utils/styles";
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
  @media (max-width: ${size.tablet}) {
    /* overflow: auto; */
  }
`;

const Covers = styled.div`
  /* background-color: red; */
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
  @media (max-width: ${size.laptop}) {
    flex-wrap: wrap;
  }
  @media (max-width: ${size.tablet}) {
    /* background-color: red; */
    justify-content: flex-start;

    /* overflow: scroll; */
  }
  @media (max-width: ${size.mobileL}) {
    overflow: auto;
    flex-wrap: nowrap;
  }
`;
const Cover = styled.div`
  width: 18rem;
  height: 28rem;
  background: ${({ url }) => !url && colors.light};
  margin-left: 1rem;
  border-radius: 1rem;
  background-image: url(${({ url }) => url});
  background-size: cover;
  border: solid 0.1rem #ddd;

  @media (max-width: ${size.laptop}) {
    margin-bottom: 2rem;
  }
`;

export default function LineBooks({ title, items, hidemore }) {
  
  return (
    <Container>
      <BooksBlock>
        <Head title={title} hidemore={hidemore} />
        <Covers>
          {items.length > 0 ? (
            items.map((i, index) => (
              <Link
                key={index}
                to={`${routes.BOOK}/${i.title.replaceAll(" ", "-")}`}
              >
                <Cover>
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
  );
}
