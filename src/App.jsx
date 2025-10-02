import { useState } from "react";
import UseCurrencyInfo from "./UseCurrencyInfo";
import InputBox from "./InputBox"; // 👈 import your custom component

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencyData = UseCurrencyInfo(fromCurrency);
  const currencyOptions = currencyData ? Object.keys(currencyData) : [];

  const handleConvert = () => {
    if (amount && currencyData[toCurrency]) {
      const result = amount * currencyData[toCurrency];
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount(null);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null); // clear result on swap
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-400 to-purple-500">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Currency Converter</h1>

        {/* Input box for FROM currency */}
        <InputBox
          label="From"
          amount={amount}
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onAmountChange={(val) => setAmount(val)}
          onCurrencyChange={(val) => setFromCurrency(val)}
        />

        {/* Swap button */}
        <div className="flex justify-center my-4">
          <button
            onClick={handleSwap}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Swap
          </button>
        </div>

        {/* Input box for TO currency */}
        <InputBox
          label="To"
          amount={convertedAmount || ""}
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onCurrencyChange={(val) => setToCurrency(val)}
          amountDisabled={true} // disable user typing for result
        />

        {/* Convert button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleConvert}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Convert
          </button>
        </div>

        {/* Converted amount (shown only after clicking Convert) */}
        {convertedAmount && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold">
              {amount} {fromCurrency.toUpperCase()} ={" "}
              <span className="text-green-600">{convertedAmount}</span>{" "}
              {toCurrency.toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
