import Explore from "../components/Explore";
import Hero from "../components/Hero";
import LineBooks from "../components/LineBooks";
import TwoLinesBlocks from "../components/TwoLinesBlocks";
import Loader from "../components/Loader";
import { Center, Container, Seperator } from "../utils/styles";
import { useEffect,  useState } from "react";
import routes from "../constants/routes";
import http from "../services/http";
import { Redirect } from "react-router-dom";
import baseUrl from "../services/baseUrl";

export default function Home() {
  const [homeData, setHomeData] = useState([]);
  const getHome = async () => {
    try {
      // setLoading(true);
      const { data } = await http.get(`${baseUrl}${routes.HOME}`);
      setHomeData(data.context);
      // setLoading(false);
    } catch (ex) {
      // if (ex.response && ex.response.status === 404) {
        return <Redirect to={routes.NOTFOUND} />
      // }
    }
  };
  useEffect(() => {
    document.title = "Welcome to iread ";
    getHome();
  }, []);
  return (
    <>
      <Hero />
      <>
        {homeData["history"] ? (
          <LineBooks title='history' items={homeData["history"]} hidemore={true} />
        ) : (
          <Center>
            <Loader />
          </Center>
        )}
        <Container>
          <Seperator mt={3} />
        </Container>
        {homeData["education"] ? (
          <TwoLinesBlocks title='education' items={homeData["education"]} hidemore={true} />
        ) : (
          <Center>
            <Loader />
          </Center>
        )}

        <Container>
          <Seperator mt={3} mb={4} />
        </Container>
        {homeData["explore"] ? (
          <Explore itemsr={homeData["explore"]} />
        ) : (
          <Center>
            <Loader />
          </Center>
        )}
      </>
      {/* )} */}
    </>
  );
}
