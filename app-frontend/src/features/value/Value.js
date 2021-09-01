import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchValue, newValue, valueSelector, errorMessageSelector, hasErrorsSelector } from './valueSlice';

import styles from './Value.module.css';

export function Value() {
  const { value } = useSelector(valueSelector);
  const error  = useSelector(errorMessageSelector);
  const hasErrors = useSelector(hasErrorsSelector);
  const dispatch = useDispatch();
  const [val, setVal] = useState(value);
  //const [errorMsg, setErrorMsg] = useState(error);
  
  const valNum = Number(val);
  
  function handleError(err){
   if(hasErrors){
     alert(err);
   }
  }

  useEffect(() => {
    dispatch(fetchValue());
  }, [dispatch]);

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
        onClick={() => dispatch(newValue(valNum.toString(), error))}
      >
          Double
        </button>
      </div>
  );
}
