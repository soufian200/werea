import { useEffect, useState } from "react";
import baseUrl from "../services/baseUrl";
import http from "../services/http";

export default function useGetQuery(endpoint) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const getQuery = async () => {
    try {
      setLoading(true);
      const { data: d } = await http.get(`${baseUrl}${endpoint}`);
      setData(d);
      setLoading(false);
    } catch (ex) {
      setErr(ex.response);
      setLoading(false);
    }
  };
  useEffect(() => {
    getQuery();
  }, []);

  return [loading, data, err, setData];
}
