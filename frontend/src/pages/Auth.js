import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import Login from "../components/forms/Login";
import Signup from "../components/forms/Signup";
import Loader from "../components/Loader";
import colors from "../constants/colors";
import routes from "../constants/routes";

const Bg = styled.div`
  background-color: ${colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Formp = styled.div`
  background-color: white;
  width: 40rem;
  /* height: 40rem; */
  padding: 2rem;
  & > h1 {
    text-transform: capitalize;
    margin-bottom: 2rem;
    font-size: 2.6rem;
    text-align: center;
  }
`;
const OverLayer = styled.div`
  background-color: #eaeaea90;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* pointer-events: none; */
`;
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);

  return (
    <Bg>
      {/* <h1>login</h1> */}

      <Formp>
        <Switch>
          <Redirect
            exact
            from={routes.SUP + routes.AUTH}
            to={routes.SUP + routes.AUTH + routes.LOGIN}
          />
          <Route exact path={routes.SUP + routes.AUTH + routes.LOGIN}>
            <Login setLoading={setLoading} created={created} />
          </Route>
          <Route exact path={routes.SUP + routes.AUTH + routes.SIGNUP}>
            <Signup setLoading={setLoading} setCreated={setCreated} />
          </Route>
          <Redirect to={routes.SUP + routes.NOTFOUND} />
        </Switch>
      </Formp>
      {loading && (
        <OverLayer>
          <Loader />
        </OverLayer>
      )}
    </Bg>
  );
}
