import { useState, useEffect } from "react";
import { backendApi } from "./axiosBase";

export default function useFetch({
  api = backendApi,
  method = 'get',
  url,
  config = null,
}) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        api[method](url, JSON.parse(config))
          .then((res) => {
            setResponse(res.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [api, method, url, config]);

  return { response, error, isLoading };
}
