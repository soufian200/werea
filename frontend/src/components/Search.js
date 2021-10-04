import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../constants/colors";
import { Link } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import routes from "../constants/routes";
import size from "../constants/size";
import baseUrl from "../services/baseUrl";
import http from "../services/http";

const S = styled.div`
  position: relative;
  flex: 4;
  @media (max-width: ${size.tablet}) {
  }
  /* background-color: red; */
`;
const SearchResult = styled.div`
  background-color: white;
  /* background-color: green; */
  position: absolute;
  max-height: 44rem;
  overflow: auto;
  width: 100%;
  top: 4.5rem;
  border-radius: 0.6rem;
  box-shadow: 0 0rem 0.4rem rgba(0, 0, 0, 0.2);
  /* padding: 1rem; */
  z-index: 10;

  & > div.results > p {
    color: black;
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 0.6rem;
    padding-left: 2.5rem;
    text-transform: capitalize;
  }

  & > div.no-result {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    padding: 2rem;
    & > svg {
      margin-right: 0.5rem;
    }
  }
  @media (max-width: ${size.tablet}) {
    background-color: white;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    border-radius: 0;
    box-shadow: none;
    border-top: solid 0.1rem ${colors.light};
    top: 6.5rem;
    & > div.results > p {
      font-size: 2rem;
      margin-top: 2rem;
      padding-left: 5rem;
    }
  }
`;

const SearchBox = styled.div`
  background: ${colors.light};
  padding-left: 1rem;
  border-radius: 4rem;
  height: 3.8rem;
  width: 100%;
  display: flex;
  align-items: center;
  /* position: relative; */

  /* :before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: red;
    z-index: 999;
  } */

  & > svg {
    font-size: 2rem;
    color: #505050;
  }

  & > input {
    outline: 0;
    border: 0;
    margin-left: 1rem;
    width: 100%;
    height: 100%;
    background: none;
  }

  @media (max-width: ${size.tablet}) {
    padding-left: 1.4rem;
    height: 5rem;
    /* flex: 2; */

    & > input {
      font-size: 1.6rem;
    }
    & > svg {
      font-size: 1.8rem;
    }
  }
`;

const Close = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  & > svg {
    border-radius: 2rem;
    padding: 0.1rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.1s;
    :hover {
      background-color: #ddd;
    }
  }
`;

const B = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  text-decoration: none;
  color: ${colors.black};
  transition: 0.2s;

  &:hover {
    background: ${colors.light};
  }
  & > h3 {
    text-transform: capitalize;
    font-size: 1.1rem;
  }
`;

const Cover = styled.div`
  width: 5rem;
  height: 7rem;
  background: ${colors.light};
  margin-right: 0.6rem;
  border-radius: 0.3rem;
  border: solid 0.1rem #ddd;
  overflow: hidden;
`;

export default function Search() {
  const [show, setShow] = useState(false);
  const [close, setClose] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  let prevquery = "";

  const handleSearch = async () => {
    setInterval(async () => {
      if (query !== prevquery) {
        try {
          const { data } = await http.get(
            `${baseUrl}${routes.SEARCH}?q=${query.toLowerCase()}`
          );
          setResults(data.search);
          prevquery = query;
        } catch (ex) {
          if (ex.response && ex.response.status === 404) {
            console.log("query not found");
          }
        }
      }
    }, 2000);
  };

  function Item({ cover, title, path }) {
    return (
      <B to={routes.BOOK + "/" + path}>
        <Cover>
          <img src={ cover} alt="cover" />
        </Cover>
        <h3>{title}</h3>
      </B>
    );
  }

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <S>
      <SearchBox>
        <FiSearch />
        <input
          onFocus={() => {
            setShow(true);
            setClose(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShow(false);
              setClose(false);
              // console.log("hideing...");
            }, 150);
          }}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type='text'
          placeholder='search for books, novels...'
        />
        {close && (
          <Close onClick={() => setQuery("")}>
            <AiOutlineClose />
          </Close>
        )}
      </SearchBox>
      {show && (
        <SearchResult>
          {results.length > 0 &&
            results.map((i, index) => (
              <div className='results'>
                <Item
                  title={i.title}
                  cover={i.cover}
                  path={i.title.replaceAll(" ", "-")}
                  key={index}
                />
              </div>
            ))}
          {results.length === 0 && (
            <div className='no-result'>
              <AiOutlineExclamationCircle />
              <p>no result</p>
            </div>
          )}
        </SearchResult>
      )}
    </S>
  );
}
