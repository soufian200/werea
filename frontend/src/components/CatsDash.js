import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled, { keyframes } from "styled-components";
import colors from "../constants/colors";
import Loader from "./Loader";
import NewCategory from "./forms/NewCategory";
import { BiTrash } from "react-icons/bi";
import useGetQuery from "../hooks/useGetCategories";
import routes from "../constants/routes";
import { Center } from "../utils/styles";
import { isEmpty } from "../utils/funs";
import Empty from "./Empty";
import Err from "./Err";
import http from "../services/http";

const fadein = keyframes`
 0% { opacity:0 }
 100% { opacity:1 }
`;

const Over = styled.div`
  position: fixed;
  animation: ${fadein} 0.2s linear;
  background-color: #000000c1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 12;
`;

const C = styled.div`
  margin-top: 3rem;
  margin-bottom: 10rem;
`;
const New = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;

  :active {
    transform: scale(0.94);
  }

  & > p {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    text-decoration: none;
    text-transform: capitalize;
    background-color: ${colors.yellow};
    padding: 0.9rem 1rem;
    border-radius: 3rem;
    cursor: pointer;
    color: ${colors.black};
    & > svg {
      margin-right: 0.5rem;
      font-size: 2rem;
    }
  }
`;
const Cats = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Cat = styled.div`
  width: 18rem;
  height: 14rem;
  background-color: ${colors.light};
  margin-right: 1rem;
  margin-top: 1rem;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  & > h1 {
    text-transform: capitalize;
  }

  :hover div {
    /* background-color: red; */
    opacity: 1;
    transform: translateY(0rem);
  }
`;

const Delete = styled.div`
  border-radius: 50%;
  width: 3.4rem;
  height: 3.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  transition: 0.2s;
  transform: translateY(-3rem);
  opacity: 0;
  :hover {
    background-color: #ddd;
  }
  & > svg {
    font-size: 2rem;
  }
`;

export default function CatsDash() {
 
  const [hide, setHide] = useState(true);

  const [loading, data, err, setData] = useGetQuery(
    `${routes.CATEGORIES}?g=true`
  );

  const removeCategory = (title) => {
    try {
       http.delete(
        `${routes.CATEGORIES}/remove/${title}`
      );
      // console.log(d);
      const newdata = data.filter((i) => i.title !== title);

      setData(newdata);
    } catch (ex) {
      alert(ex.response);
      // console.log(ex.response);
    }
  };

  if (err) {
    // alert(err);
    // console.log(err);
    if (err.status === 404) {
      return <Err err={err.data.err} status={err.status} />;
    } else if (err.status === 500) {
      return <Err err={err.data.err} status={err.status} />;
    }
  }

  return (
    <C>
      {!hide && (
        <Over>
          <NewCategory setHide={setHide} setData={setData} data={data} />
        </Over>
      )}

      <New>
        <p onClick={() => setHide(false)}>
          <AiOutlinePlus /> <p>new category</p>
        </p>
      </New>
      <Cats>
        {loading && (
          <Center>
            <Loader c={18} r={16} />
          </Center>
        )}
        {isEmpty(data) ? (
          <Empty />
        ) : (
          data.map((i, index) => (
            <Cat key={index}>
              <Delete onClick={() => removeCategory(i.title)}>
                <BiTrash />
              </Delete>
              <h1>{i.title}</h1>
            </Cat>
          ))
        )}
      </Cats>
    </C>
  );
}
