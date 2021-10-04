import styled from "styled-components";
import Loader from "./Loader";
import colors from "../constants/colors";
import { Center, Seperator } from "../utils/styles";
import useGetQuery from "../hooks/useGetCategories";
import routes from "../constants/routes";
import { isEmpty } from "../utils/funs";
import Err from "./Err";

const Cc = styled.div`
  margin-bottom: 2rem;
`;
const Status = styled.div`
  display: flex;
`;
const S = styled.div`
  /* background-color: red; */
  max-width: 16rem;
  width: 32%;
  height: 9rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 1rem;
`;
const N = styled.h1`
  font-size: 3.4rem;
  margin-bottom: 1rem;
`;
const L = styled.p`
  text-transform: capitalize;
  font-size: 1.5rem;
`;

export default function DashHome() {
  // const [status, setStatus] = useState([
  //   { title: "pendings", counts: "4" },
  //   { title: "books", counts: "204" },
  //   { title: "novels", counts: "121" },
  //   { title: "audio", counts: "0" },
  // ]);
  const bg = [colors.b1, colors.b2, colors.b3, colors.b4];

  const [loading, data, err] = useGetQuery(
    routes.SUP + routes.DASHBOARD + "/status"
  );
  if (err) {
    return <Err err={err.statusText} status={err.status} />;
  }

  return (
    <Cc>
      {loading && (
        <Center>
          <Loader c={18} r={16} />
        </Center>
      )}
      {!isEmpty(data) && (
        <>
          <Status>
            {!isEmpty(data) &&
              data.status.map((i, index) => (
                <S key={index} style={{ backgroundColor: bg[index] }}>
                  <N>{i.counts}</N>
                  <L>{i.title}</L>
                </S>
              ))}
          </Status>
          <Seperator mt={2} mb={2} />
        </>
      )}
    </Cc>
  );
}
