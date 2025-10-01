import { useEffect, useState } from "react";

function UseCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        const result = await response.json();
        //  The actual data structure looks like: { "usd": { "inr": 83.25, ... } }
        setData(result[currency]); // extract nested object
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setData({});
      }
    };

    fetchData();
  }, [currency]);

  return data;
}

export default UseCurrencyInfo;
