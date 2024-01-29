import Button from "../ui/Button";
import CalculatorHeader from "./CalculatorHeader";
import DeliveryBike from "../../assets/bike-ezgif.com-crop.gif";
import ItemListIcon from "../../assets/add-to-cart.png";

import CalculatorFooter from "./CalculatorFooter";

const CalculatorUserForm = () => {
  return (
    <div className="calculator-form-container">
      <div className="calculator-header-container">
        <CalculatorHeader />
      </div>

      <div className="calculator-form-item">
        <label>Cart value</label>
        <div>
          <input type="number" name="value" data-test-id="cartValue" />
          <div className="icon">
            <span>€</span>
          </div>
        </div>
        <span className="errors"></span>
      </div>
      <div className="calculator-form-item">
        <label>Delivery distance</label>
        <div>
          <input
            type="number"
            name="distance"
            data-test-id="deliveryDistance"
          />
          <div className="icon">
            <span>m</span>
          </div>
        </div>
        <span className="errors"></span>
      </div>
      <div className="calculator-form-item">
        <label>Ammount of items</label>
        <div>
          <input type="number" name="ammounts" data-test-id="numberOfItems" />
          <div className="icon">
            <img
              src={ItemListIcon}
              width={25}
              height={25}
              alt="calender-icon"
            />
          </div>
        </div>
        <span className="errors"></span>
      </div>
      <div className="calculator-form-item">
        <label>Time</label>
        <div>
          <input
            type="datetime-local"
            name="time"
            min={new Date().toISOString().slice(0, -8)}
            data-test-id="orderTime"
          />
        </div>
        <span className="errors"></span>
      </div>
      <div className="calculator-form-item">
        <Button callback={() => {}} name="Calculate delivery price" />
        <Button callback={() => {}} name="Reset" />
      </div>
      <div className="delivery-bike-anim">
        <div>
          <img src={DeliveryBike} width={"100%"} height={"100%"} alt="bike" />
          <CalculatorFooter />
        </div>
      </div>
    </div>
  );
};

export default CalculatorUserForm;
