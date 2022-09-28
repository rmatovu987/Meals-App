import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountRef.current.value;

    if (
      enteredAmount.trim().length === 0 ||
      +enteredAmount < 0 ||
      +enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(+enteredAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount.</p>}
    </form>
  );
};

export default MealItemForm;
