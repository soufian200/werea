import { Redirect } from "react-router-dom";
import axios from "axios";
import routes from "../constants/routes";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(null, (error) => {
  const unexpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (error.response.status === 500) {
    return <Redirect to={routes.NOTFOUND} />;
  }
  if (!unexpectedError) {
    alert(error.response.status + " server error ...");
    console.log(error.response.status + " server error ...");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  baseURL:axios,
};
