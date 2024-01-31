import { resultType } from "./DeliveryFeeCalculator";
import arrowDown from "../../assets/down-chevron.png";
import { useEffect, useState } from "react";
type calculationDetailsType = {
  result: resultType;
};
const CalculationDetails = ({ result }: calculationDetailsType) => {
  const [isShowDetials, setIsShowDetails] = useState(false);

  useEffect(() => {
    setIsShowDetails(result.showDetails);
  }, [result]);
  return (
    <div className="calculation-details-container">
      <div
        className="calculation-header"
        onClick={() => {
          setIsShowDetails((prevState) => !prevState);
        }}
      >
        <h3>Calculation Summery</h3>
        <img src={arrowDown} width={15} height={15} alt="arrow-down" />
      </div>
      <div className={` ${isShowDetials ? "" : "hide-content"}`}>
        <p>
          <span>Value Surcharge</span>
          <span> :</span>
          <span>{result.valueSurcharge.toFixed(2)}</span>
        </p>
        <p>
          <span>Distance Fee</span>
          <span> :</span>
          <span>{result.distanceFee.toFixed(2)}</span>
        </p>
        <p>
          <span>Cart Items Fee</span>
          <span> :</span>
          <span>{result.cartItemFee.toFixed(2)}</span>
        </p>
        <p>
          <span> Rush Hour Fee</span>
          <span> :</span>
          <span>{result.rushHourFee.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default CalculationDetails;
