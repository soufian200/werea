import styled, { keyframes } from "styled-components";
import colors from "../constants/colors";
import { useEffect, useState } from "react";
import { BiCheck, BiPencil, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import routes from "../constants/routes";
import { Center } from "../utils/styles";
import { isEmpty } from "../utils/funs";
import baseUrl from "../services/baseUrl";
import Empty from "./Empty";
import http from "../services/http";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import FilterDash from "./FilterDash";
import * as _ from "lodash";
import EditBook from "./EditBook";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  & tr {
    :hover {
      background: #f9f9f9;
    }
  }
  & tr > th {
    background-color: ${colors.light};
    /* background-color: #f9f9f9; */
    padding: 1.5rem 0.3rem;
    text-transform: capitalize;
  }
  & tr > td {
    text-transform: capitalize;
  }
  & tr > th#title {
    width: 20%;
  }
  & tr > th#cover {
    width: 4%;
  }
  /* 
  & > tr > th#id {
    width: 4%;
  }
 
  
 
  & > tr > th#rate {
    width: 3%;
  }
  & > tr > th#pages {
    width: 6%;
  }
  & > tr > th#author {
    width: 10%;
  }
 
  & > tr > th#category {
    width: 4%;
    background: red;
  }
  */
  & > tr > th#description {
    width: 20%;
  }
  & > tr > th#date {
    width: 4%;
  }
  & tr > th#controlls {
    width: 4%;
  }
  & tr > td {
    padding: 0.5rem 0;
    text-align: center;
  }
`;

const Cover = styled.div`
  background-color: #ddd;
  width: 4.5rem;
  height: 6rem;
  border-radius: 0.4rem;
  overflow: hidden;
  border: solid 0.1rem #ddd;
`;

const Controlls = styled.div`
  display: flex;
  justify-content: center;
`;
const Ico = styled.button`
  padding: 0.3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: 0.18s;
  background: none;
  border: 0;
  outline: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    font-size: 2rem;
    /* margin-right: 1rem; */
  }
`;
const Edit = styled(Link)`
  padding: 0.3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: 0.18s;
  background: none;
  border: 0;
  outline: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: ${colors.orange + "15"};
  }
  & > svg {
    font-size: 2rem;
    color: ${colors.orange};
  }
`;
const Delete = styled(Ico)`
  :hover {
    background-color: #ff000015;
  }
  & > svg {
    color: red;
  }
`;
const Activate = styled(Ico)`
  :hover {
    background-color: #4caf5015;
  }
  & > svg {
    color: #4caf50;
  }
`;

const More = styled.button`
  border: 0;
  outline: 0;
  background: ${colors.primary};
  padding: 1.8rem 5rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  font-size: 1.5rem;
  color: white;
  :hover {
    opacity: 0.9;
  }
  :active {
    transform: scale(0.96);
  }
`;

// const NotAnim = keyframes`
// 0%{

// }
// `

const Not = styled.div`
  position: fixed;
  left: 45%;
  top: 5rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0 0 0.6rem gray;
  border-radius: 0.3rem;
  transform: ${({ showNot }) =>
    showNot ? "translateY(0rem)" : "translateY(-11rem)"};
  transition: 0.3s ease-in-out;

  & > svg {
    font-size: 2.8rem;
    color: green;
    margin-right: 1rem;
  }
  & > p {
    text-transform: capitalize;
  }
`;
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
  /* overflow: auto; */
`;

export default function TableDash({ pendings = false, ep }) {
  const [page, setPage] = useState(1);
  const [showNot, setShowNot] = useState(false);
  const [crud, setCrud] = useState({});
  // const [prev, setPrev] = useState({ count: 0, books: [] });
  const [loading, setLoading] = useState(false);
  const [dashbooks, setDashbooks] = useState([]);
  const [count, setCount] = useState();
  const [editId, setEditId] = useState(null);
  // const psref = useRef();
  // const pagiref = useRef();

  // const [loading, data, err, setData] = useGetQuery(endpoint, page);

  const getDashBooks = async () => {
    const endpoint =
      baseUrl + routes.SUP + routes.DASHBOARD + ep + "?page=" + page;
    try {
      setLoading(true);
      const { data } = await http.get(endpoint);
      setDashbooks(_.unionBy([...dashbooks, ...data.books], "_id"));
      setCount(data.count);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  function hideNotfication() {
    setTimeout(() => {
      setShowNot(false);
      window.location.reload();
    }, 3000);
  }

  const activateBook = async (id) => {
    try {
      const { data: d } = await http.patch(
        `${baseUrl}${routes.SUP}${routes.DASHBOARD}${routes.P}/activate/${id}`,
        { isActive: true }
      );
      const newBooks = _.unionBy(
        dashbooks.filter((i) => i._id != id),
        "_id"
      );

      if (!isEmpty(d)) {
        setDashbooks(newBooks);
        setCrud(d);
        setShowNot(true);
        hideNotfication();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const deleteBook = async (id) => {
    try {
      const { data: d } = await http.delete(
        `${baseUrl}${routes.SUP}${routes.DASHBOARD}${routes.B}/delete/${id}`
      );
      const newBooks = _.unionBy(
        dashbooks.filter((i) => i._id != id),
        "_id"
      );

      if (!isEmpty(d)) {
        setDashbooks(newBooks);
        setCrud(d);
        setShowNot(true);
        hideNotfication();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getDashBooks();
  }, [page]);

  return (
    <>
      {/* NOTIFICATION */}
      <Not showNot={showNot}>
        {crud.operation == "delete" && <AiFillCloseCircle color='red' />}
        {crud.operation == "activate" && <AiFillCheckCircle color='green' />}

        <p>{crud.msg}</p>
      </Not>

      {/* edit */}
      {editId && (
        <Over>
          <EditBook id={editId} />
        </Over>
      )}

      <FilterDash setDashbooks={setDashbooks} />
      <Table>
        <tbody>
          <tr>
            {/* <th id='select'></th> */}
            <th id='id'>#id</th>
            <th id='cover'>cover</th>
            <th id='title'>book's title</th>
            <th id='author'>author</th>
            <th id='rate'>rate</th>
            <th id='pages'>pages</th>
            <th id='rate'>year</th>
            <th id='category'>category</th>
            <th id='date'>date created</th>
            <th id='description'>descirption</th>
            <th id='controlls'>-</th>
          </tr>

          {dashbooks.length > 0 &&
            dashbooks.map((i, index) => (
              <tr key={index}>
                {/* <td>
                  <input type='checkbox' />
                </td> */}
                <td>
                  <b>{index + 1}</b>
                </td>
                <td>
                  <Cover>
                    <img src={i.cover} />
                  </Cover>
                </td>

                <td>{i.title}</td>
                <td>{i.author}</td>
                <td>{i.rate}</td>
                <td>{i.pages}</td>
                <td>{i.year}</td>
                <td>{i.category}</td>
                <td>{i.dateCreated}</td>
                <td>{(i.description || "").substr(0, 100)}</td>
                <td>
                  <Controlls>
                    {pendings ? (
                      <Activate onClick={() => activateBook(i._id)}>
                        <BiCheck />
                      </Activate>
                    ) : (
                      <>
                        <Edit
                          to={routes.SUP + routes.DASHBOARD + "/edit/" + i._id}
                        >
                          <BiPencil />
                        </Edit>
                      </>
                    )}
                    <Delete onClick={() => deleteBook(i._id)}>
                      <BiTrash />
                    </Delete>
                  </Controlls>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {loading && (
        <Center>
          <Loader />
        </Center>
      )}
      {dashbooks.length === 0 && !loading && (
        <Empty msg='there are no more books to show' />
      )}

      {dashbooks.length > 0 && !loading && count !== 0 && (
        <Center>
          <More
            onClick={() => {
              setPage(page + 1);
            }}
          >
            show more
          </More>
        </Center>
      )}
    </>
  );
}
