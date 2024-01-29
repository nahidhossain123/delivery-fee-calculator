import DeliveryFeeCalculator from "../../components/DeliveryFeeCalculator/DeliveryFeeCalculator";
import "./CalculationPageStyle.css";

const CalculationPage = () => {
  return (
    <div className="container">
      <div className="claculation-page">
        <DeliveryFeeCalculator />
      </div>
    </div>
  );
};

export default CalculationPage;
