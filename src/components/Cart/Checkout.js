import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() !== "";
const notFive = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    code: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const codeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const code = codeRef.current.value;
    const city = cityRef.current.value;

    const validName = isEmpty(name);
    const validStreet = isEmpty(street);
    const validCode = !notFive(code);
    const validCity = isEmpty(city);

    setFormInputsValid({
      name: validName,
      street: validStreet,
      code: validCode,
      city: validCity,
    });

    let formIsValid = false;
    if (validCity && validCode && validName && validStreet) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }

    props.onConfirm({ name, street, code, city });
  };

  const nameChangeHandler = () => {
    const name = nameRef.current.value;

    setFormInputsValid({
      name: isEmpty(name),
      street: formInputsValid.street,
      code: formInputsValid.code,
      city: formInputsValid.city,
    });
  };

  const streetChangeHandler = () => {
    const street = streetRef.current.value;

    setFormInputsValid({
      name: formInputsValid.name,
      street: isEmpty(street),
      code: formInputsValid.code,
      city: formInputsValid.city,
    });
  };

  const cityChangeHandler = () => {
    const city = cityRef.current.value;

    setFormInputsValid({
      name: formInputsValid.name,
      street: formInputsValid.street,
      code: formInputsValid.code,
      city: isEmpty(city),
    });
  };

  const codeChangeHandler = () => {
    const code = codeRef.current.value;

    setFormInputsValid({
      name: formInputsValid.name,
      street: formInputsValid.street,
      code: !notFive(code),
      city: formInputsValid.city,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValid.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          onChange={nameChangeHandler}
        />
        {!formInputsValid.name && (
          <div className={classes.error}>Enter a valid name</div>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValid.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          ref={streetRef}
          onChange={streetChangeHandler}
        />
        {!formInputsValid.street && (
          <div className={classes.error}>Enter a valid street</div>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValid.code ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          ref={codeRef}
          onChange={codeChangeHandler}
        />
        {!formInputsValid.code && (
          <div className={classes.error}>
            Enter a valid postal code (Should be 5 digits)
          </div>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValid.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          ref={cityRef}
          onChange={cityChangeHandler}
        />
        {!formInputsValid.city && (
          <div className={classes.error}>Enter a valid city</div>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
