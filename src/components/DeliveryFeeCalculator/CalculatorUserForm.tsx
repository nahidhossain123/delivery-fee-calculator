import Button from "../ui/Button";
import CalculatorHeader from "./CalculatorHeader";
import DeliveryBike from "../../assets/bike-ezgif.com-crop.gif";
import ItemListIcon from "../../assets/add-to-cart.png";
import { ChangeEvent, useState } from "react";
import { CalculationRule } from "../../utils/constants";
import { initialResult, resultType } from "./DeliveryFeeCalculator";
import CalculatorFooter from "./CalculatorFooter";

type calculatorFormPropsType = {
  callback: ({}: resultType) => void;
};
type inputErrorsType = {
  valueError: string;
  distanceError: string;
  ammountsError: string;
  dateError: string;
};

type formType = {
  value: number;
  distance: number;
  ammounts: number;
  time: string;
};

const initialFormData = {
  value: 0,
  distance: 0,
  ammounts: 0,
  time: "",
};

const initialErrors = {
  valueError: "",
  distanceError: "",
  ammountsError: "",
  dateError: "",
};

const CalculatorUserForm = ({ callback }: calculatorFormPropsType) => {
  const [inputErrors, setInputErrors] =
    useState<inputErrorsType>(initialErrors);
  const [formData, setFormData] = useState<formType>(initialFormData);

  //rest all state values if rest button clicked
  const resetForm = () => {
    callback(initialResult);
    setInputErrors(initialErrors);
    setFormData(initialFormData);
  };

  //this function handle all the calculation based upon rules
  const handleCalculation = () => {
    let isError = false;
    let valueSurCharge = 0;
    let distanceFee = 0;
    let cartItemFee = 0;
    let rushHourFee = 0;
    //If cart value is greater than or equal to 200 then delivery fee zero
    if (formData.value >= CalculationRule.FREE_DELIVERY_VALUE) {
      callback({ ...initialResult, total: 0, showDetails: true });
      return 0;
    }

    if (formData.value > 0) {
      setInputErrors((prevState) => ({
        ...prevState,
        valueError: "",
      }));
      //If cart value is less than 10
      if (formData.value < CalculationRule.MIN_VALUE_WITHOUT_SURCHARGE) {
        valueSurCharge =
          CalculationRule.MIN_VALUE_WITHOUT_SURCHARGE - formData.value;
      }
    } else {
      isError = true;
      setInputErrors((prevState) => ({
        ...prevState,
        valueError: "Cart value required",
      }));
    }

    if (formData.distance > 0) {
      setInputErrors((prevState) => ({
        ...prevState,
        distanceError: "",
      }));
      //If delivery distance is 1000
      if (formData.distance <= CalculationRule.MINIMUM_DISTANCE) {
        distanceFee = CalculationRule.MINIMUM_DISTANCE_FEE;

        //If delivery distance is greater than 1000
      } else if (formData.distance > CalculationRule.MINIMUM_DISTANCE) {
        if (formData.distance % CalculationRule.MAX_ADDITINAL_DISTANCE == 0) {
          distanceFee =
            formData.distance / CalculationRule.MAX_ADDITINAL_DISTANCE;
        } else
          distanceFee =
            formData.distance / CalculationRule.MAX_ADDITINAL_DISTANCE + 1;
      }
    } else {
      isError = true;
      setInputErrors((prevState) => ({
        ...prevState,
        distanceError: "Delivery distance required",
      }));
    }
    if (formData.ammounts > 0) {
      setInputErrors((prevState) => ({
        ...prevState,
        ammountsError: "",
      }));
      if (formData.ammounts > CalculationRule.MIN_ITEMS_WITHOUT_SURCHARGE) {
        cartItemFee =
          (formData.ammounts - CalculationRule.MIN_ITEMS_WITHOUT_SURCHARGE) *
          CalculationRule.ADITIONAL_ITEM_SURCHARGE;
        if (formData.ammounts > CalculationRule.BULK_ITEM_COUNT - 1) {
          cartItemFee += CalculationRule.BULK_ITEM_FEE;
        }
      }
    } else {
      isError = true;
      setInputErrors((prevState) => ({
        ...prevState,
        ammountsError: "Total cart items required",
      }));
    }

    if (formData.time) {
      isError = false;
      setInputErrors((prevState) => ({
        ...prevState,
        dateError: "",
      }));
      let dateTime = new Date(formData.time);
      let day = dateTime.getDay(); //get day [0-6]
      let hour = dateTime.getHours(); //get hours
      let minutes = dateTime.getMinutes(); //get minutes
      //if it is rush day and rush hour
      if (
        day == CalculationRule.RUSH_DAY &&
        hour >= CalculationRule.RUSH_START_TIME &&
        hour <= CalculationRule.RUSH_END_TIME
      ) {
        //if it is rush hour end hour then check minute
        if (hour == CalculationRule.RUSH_END_TIME) {
          // if minute is equal to zero then rush hour
          if (minutes == 0) {
            rushHourFee = CalculationRule.RUSH_HOUR_FEE;
          }
        } else {
          rushHourFee = CalculationRule.RUSH_HOUR_FEE;
        }
      }
    } else {
      isError = true;
      setInputErrors((prevState) => ({
        ...prevState,
        dateError: "Order time required",
      }));
    }

    //setting the final result
    if (!isError) {
      callback({
        valueSurcharge: valueSurCharge,
        distanceFee: distanceFee,
        cartItemFee: cartItemFee,
        rushHourFee: rushHourFee,
        total:
          (valueSurCharge + distanceFee + cartItemFee) *
          (rushHourFee > 0 ? rushHourFee : 1),
        showDetails: true,
      });
    }
  };

  //set formData on onchange event
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="calculator-form-container">
      <div className="calculator-header-container">
        <CalculatorHeader />
      </div>

      <div className="calculator-form-item">
        <label>Cart value</label>
        <div>
          <input
            onChange={handleInput}
            type="number"
            name="value"
            className={`${inputErrors.valueError && "errors"}`}
            data-test-id="cartValue"
            value={formData.value}
          />
          <div className="icon">
            <span>€</span>
          </div>
        </div>
        <span className="errors">{inputErrors.valueError}</span>
      </div>
      <div className="calculator-form-item">
        <label>Delivery distance</label>
        <div>
          <input
            onChange={handleInput}
            type="number"
            name="distance"
            className={`${inputErrors.distanceError && "errors"}`}
            data-test-id="deliveryDistance"
            value={formData.distance}
          />
          <div className="icon">
            <span>m</span>
          </div>
        </div>
        <span className="errors">{inputErrors.distanceError}</span>
      </div>
      <div className="calculator-form-item">
        <label>Ammount of items</label>
        <div>
          <input
            onChange={handleInput}
            type="number"
            name="ammounts"
            className={`${inputErrors.ammountsError && "errors"}`}
            data-test-id="numberOfItems"
            value={formData.ammounts}
          />
          <div className="icon">
            <img
              src={ItemListIcon}
              width={25}
              height={25}
              alt="calender-icon"
            />
          </div>
        </div>
        <span className="errors">{inputErrors.ammountsError}</span>
      </div>
      <div className="calculator-form-item">
        <label>Time</label>
        <div>
          <input
            onChange={handleInput}
            type="datetime-local"
            name="time"
            min={new Date().toISOString().slice(0, -8)}
            className={`${inputErrors.dateError && "errors"}`}
            data-test-id="orderTime"
            value={formData.time}
          />
        </div>
        <span className="errors">{inputErrors.dateError}</span>
      </div>
      <div className="calculator-form-item">
        <Button callback={handleCalculation} name="Calculate delivery price" />
        <Button callback={resetForm} name="Reset" />
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
