import { useState } from "react";
import CalculationResult from "./CalculationResult";
import CalculatorUserForm from "./CalculatorUserForm";
import "./DeliveryFeeCalculatorStyle.css";

const DeliveryFeeCalculator = () => {
  return (
    <div className="calculator-container">
      <div className="calculator-body-container">
        <CalculatorUserForm />
        <CalculationResult />
      </div>
    </div>
  );
};

export default DeliveryFeeCalculator;
