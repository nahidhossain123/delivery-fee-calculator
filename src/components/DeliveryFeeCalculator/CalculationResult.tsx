const CalculationResult = () => {
  return (
    <div className="calculator-result-container">
      <div className="calculation-result">
        <p>Delivery price:</p>
        <p>
          <span data-test-id="fee">15.0</span>
          <span> €</span>
        </p>
      </div>
      <div className="calculation-detials"></div>
    </div>
  );
};

export default CalculationResult;
