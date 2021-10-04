function useQuery({ route }) {
  const [datas, setDatas];
  const getHome = async () => {
    try {
      // setLoading(true);
      const { data } = await http.get(`${baseUrl}${routes.HOME}`);
      setDatas(data);
      // setLoading(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("not found");
      }
    }
  };
  useEffect(() => {
    getHome();
  }, []);
  return "";
}
