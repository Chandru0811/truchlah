import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const MonthYearInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatInput(value);
    setInputValue(formattedValue);
  };

  const formatInput = (value) => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');

    // Format the numeric value as MM/YY
    const formattedValue = numericValue
      .slice(0, 4) // Keep only the first 4 characters
      .replace(/(\d{2})(\d{2})/, '$1/$2'); // Insert a slash between MM and YY

    return formattedValue;
  };

  return (
    <div>
      <FloatingLabel
        controlId="floatingInput"
        label="MM/YY" style={{ color: 'rgb(0,0,0,0.9)' }}

        className="my-3">
        <Form.Control type="text"
          id="monthYear"
          value={inputValue}
          onChange={handleInputChange} placeholder="MM/YY" /></FloatingLabel>
     
    </div>
  );
};

export default MonthYearInput;