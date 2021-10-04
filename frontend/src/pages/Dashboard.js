import { Container, Seperator } from "../utils/styles";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../constants/routes";
import LeftMenu from "../components/LeftMenu";
import HeadDash from "../components/HeadDash";
import DashHome from "../components/DashHome";
import TableDash from "../components/TableDash";
import CatsDash from "../components/CatsDash";
import Addnew from "./Addnew";
import EditBook from "../components/EditBook";


const H = styled.div`
  /* background-color: green; */
  display: flex;
`;
const Content = styled.div`
  width: 80%;
  /* background-color: blue; */
  padding-left: 1rem;
  padding-top: 1rem;
  margin-bottom: 3rem;
`;
export default function Dashboard() {
  return (
    <>
      <Container>
        <HeadDash />
        <Seperator mt={1} />
        <H>
          <LeftMenu />
          <Switch>
            <Redirect
              exact
              from={routes.SUP + routes.DASHBOARD}
              to={routes.SUP + routes.DASHBOARD + routes.H}
            />
            <Route
              component={Addnew}
              path={routes.SUP + routes.DASHBOARD + routes.ADDNEW}
            />
            <Content>
              <DashHome />
              <Switch>
                <Route exact path={routes.SUP + routes.DASHBOARD + routes.H}>
                  <TableDash ep={routes.H} />
                </Route>
                <Route exact path={routes.SUP + routes.DASHBOARD + routes.P}>
                  <div></div>
                  <TableDash pendings={true} ep={routes.P} />
                </Route>
                <Route exact path={routes.SUP + routes.DASHBOARD + routes.C}>
                  <CatsDash />
                </Route>
                <Route exact path={routes.SUP + routes.DASHBOARD + routes.B}>
                  <h2>books</h2>
                </Route>
                <Route exact path={routes.SUP + routes.DASHBOARD + routes.N}>
                  <h2>novels</h2>
                </Route>
                <Route exact path={routes.SUP + routes.DASHBOARD + routes.A}>
                  <h2>audio</h2>
                </Route>
                <Route exact path={routes.SUP + routes.DASHBOARD + routes.EDIT}>
                  <EditBook />
                </Route>
                <Route path={routes.SUP + routes.DASHBOARD + routes.NOTFOUND}>
                  <h1>not found</h1>
                </Route>
                <Redirect
                  to={routes.SUP + routes.DASHBOARD + routes.NOTFOUND}
                />
              </Switch>
            </Content>
          </Switch>
        </H>
      </Container>
    </>
  );
}
