import { useState, useEffect } from "react";

export default function useJsonFetch(url, opt) {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      setData(false);
      setLoading(true);
      setError(false);
      try {
        fetch(url, opt)
          .then((response) => {
            if (!response.ok) {
              setError(response.statusText);
              return false;
            }
            return response.text();
          })
          .then((response) => {
            try {
              return JSON.parse(response);
            } catch (e) {
              setError('Not valid JSON');
              return false;
            }
          })
          .then((data) => {
            setData(data);
            setLoading(false);
        });
      } catch(e) {
        console.log(e);
        setError('fetch error');
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return {data, loading, error};
};
