import "./App.css";
import Navbar from "./components/Navbar";
import { createGlobalStyle } from "styled-components";

import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Footer from "./components/Footer";
import routes from "./constants/routes";
import Categories from "./pages/Categories";
import size from "./constants/size";
import AppContext from "./context";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/NotFound";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
  outline:0;
  font-family: 'Cairo', sans-serif;
  font-family: 'Roboto', sans-serif;
  
}
/* ::-webkit-scrollbar{
  width: 1.6rem;
}
::-webkit-scrollbar-track{
  background-color:#e9ecef;
}
::-webkit-scrollbar-thumb{
  border-radius: .8rem;
  background-color: #ced4da;

} */
html{
  font-size: 62.5% ; // 62.5% = (10/16)*100 [target/browser fontsize]*100

  /* @media (max-width: ${size.tablet}) {
    font-size: 38% ;
  } */
  
}
  img{
    width:100%;
    height:100%;
  }
`;

/* body {
    color: ${colors.color_body};
    background-color: ${colors.bg_body}
  } */

function App() {

  const [dataHome, setDataHome] = useState([]);

  return (
    <>
      <AppContext.Provider value={{ dataHome, setDataHome }}>
        <GlobalStyle />

        <Switch>
          <Route path={routes.SUP}>
            <Switch>
              <Redirect exact from={routes.SUP} to={routes.SUP + routes.AUTH} />
              <ProtectedRoute
                path={routes.SUP + routes.AUTH}
                component={Auth}
                login={true}
              />

              <ProtectedRoute
                path={routes.SUP + routes.DASHBOARD}
                component={Dashboard}
              />

              <Route path={routes.SUP + routes.NOTFOUND} component={NotFound} />
              <Redirect to={routes.SUP + routes.NOTFOUND} />
            </Switch>
          </Route>

          <Route path='/'>
            <Navbar />
            <Switch>
              <Redirect exact from='/' to={routes.HOME} />
              <Route exact component={Book} path={`${routes.BOOK}/:title`} />
              <Route
                exact
                component={Categories}
                path={`${routes.CATEGORIES}`}
              />
              <Route exact component={Home} path={routes.HOME} />
              <Route path={routes.NOTFOUND} component={NotFound} />

              <Redirect to={routes.NOTFOUND} />
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </AppContext.Provider>
    </>
  );
}

export default App;
