import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { newValue, valueSelector, errorMessageSelector } from './valueSlice';

import styles from './Value.module.css';

export function Value() {
  const { value } = useSelector(valueSelector);
  const error  = useSelector(errorMessageSelector);
  const dispatch = useDispatch();
  const [val, setVal] = useState(value);
  
  const valNum = Number(val);

  return (
    <div className={styles.column}>
      <p className={styles.value}>{value}</p>
      <p className={styles.error} id="error-msg">{error}</p>
      <input
        className={styles.input}
        aria-label="Set value"
        placeholder="Enter a value"
        onChange={(e) => setVal(e.target.value)}
      />
      <button
        className={styles.button}
        type='submit'
        name='value'
        aria-label="Add value"
        onClick={() => dispatch(newValue(valNum.toString()))}
      >
          Double
        </button>
      </div>
  );
}
