import { resultType } from "./DeliveryFeeCalculator";

type resulPropsType = {
  result: resultType;
};

const CalculationResult = ({ result }: resulPropsType) => {
  return (
    <div className="calculator-result-container">
      <div className="calculation-result">
        <p>Delivery price:</p>
        <p>
          <span data-test-id="fee">{result.total.toFixed(1)}</span>
          <span> €</span>
        </p>
      </div>
    </div>
  );
};

export default CalculationResult;
