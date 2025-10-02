import { useEffect, useState } from "react";

function UseCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!baseCurrency) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`
        );
        const result = await response.json();
        setData(result[baseCurrency]); // { inr: 83.2, eur: 0.91, ... }
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setData({});
      }
    };

    fetchData();
  }, [baseCurrency]);

  return data;
}

export default UseCurrencyInfo;
