import { useState } from "react";
import CalculationResult from "./CalculationResult";
import CalculatorUserForm from "./CalculatorUserForm";
import "./DeliveryFeeCalculatorStyle.css";

export type resultType = {
  valueSurcharge: number;
  distanceFee: number;
  cartItemFee: number;
  rushHourFee: number;
  total: number;
  showDetails: boolean;
};

export const initialResult = {
  valueSurcharge: 0,
  distanceFee: 0,
  cartItemFee: 0,
  rushHourFee: 0,
  total: 0,
  showDetails: false,
};

const DeliveryFeeCalculator = () => {
  const [result, setResult] = useState<resultType>(initialResult);
  console.log("Results", result);

  return (
    <div className="calculator-container">
      <div className="calculator-body-container">
        <CalculatorUserForm callback={(val) => setResult(val)} />
        <CalculationResult result={result} />
      </div>
    </div>
  );
};

export default DeliveryFeeCalculator;
