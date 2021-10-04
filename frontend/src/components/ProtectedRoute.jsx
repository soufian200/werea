import { Route, Redirect } from "react-router-dom";
import routes from "../constants/routes";
import ls from "../services/ls";

export default function ProtectedRoute({
  component: Component,
  render,
  login = false,
  ...rest
}) {
  

  if (login) {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (ls.getUser()) {
            return <Redirect to={routes.SUP + routes.DASHBOARD + routes.H} />;
          }
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (!ls.getUser()) {
            return <Redirect to={routes.SUP + routes.AUTH + routes.LOGIN} />;
          }
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  }
}
