import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import colors from "../constants/colors";
import { useEffect, useState } from "react";
import routes from "../constants/routes";
import http from "../services/http";
import baseUrl from "../services/baseUrl";

const C = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Search = styled.div`
  border-bottom: solid 0.1rem #b4b4b4;
  width: 20rem;
  display: flex;
  align-items: center;

  & > input {
    border: 0;
    outline: 0;
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }
  & > svg {
    font-size: 1.3rem;
    margin-right: 0.4rem;
  }
`;
const Sort = styled.div`
  display: flex;
  align-items: center;

  & > p {
    text-transform: capitalize;
    /* font-weight: 600; */

    :hover {
      color: red;
      cursor: pointer;
    }
  }

  & > h5 {
    text-transform: capitalize;
    color: #353535;
    margin-right: 0.6rem;
    font-size: 1rem;
  }

  & > span {
    margin: 0 0.3rem;
  }
`;

export default function FilterDash({ setDashbooks }) {
  const [sort, setSort] = useState("asc");
  const [query, setQuery] = useState("");

  let prevquery = "";

  const handleSearch = async () => {
    setInterval(async () => {
      if (query !== prevquery && query !== "") {
        try {
          const { data } = await http.get(
            `${baseUrl}${routes.SEARCH}?query=${query}`
          );
          // setResults(data.search);
          setDashbooks(data.search);
          prevquery = query;
        } catch (ex) {
          if (ex.response && ex.response.status === 404) {
            console.log("query not found");
          }
        }
      }
    }, 2000);
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <>
      <C>
        <Search>
          <AiOutlineSearch />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type='text'
            placeholder='Search for books'
          />
        </Search>
        {/* <h3>home</h3> */}
        <Sort>
          <h5>order by: </h5>
          <p
            onClick={() => setSort("asc")}
            style={{ color: sort === "asc" ? colors.primary : colors.black }}
          >
            asc
          </p>
          <span>/</span>
          <p
            onClick={() => setSort("desc")}
            style={{ color: sort === "desc" ? colors.primary : colors.black }}
          >
            desc
          </p>
        </Sort>
      </C>
      
    </>
  );
}
