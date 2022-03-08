import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { InputGroup, FormControl, Form } from 'react-bootstrap'

import { ADD_EXPENSE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const ExpenseForm = ({ tripId }) => {
  console.log(tripId)
  const [formState, setFormState] = useState({tripId: tripId, expenseDescription: '', price: 0, expenseAuthor: '' });

  const [addExpense, { error }] = useMutation(ADD_EXPENSE);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    })
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    
    try {
      const  {data}  = await addExpense({
        variables: {  tripId: formState.tripId, expenseDescription: formState.expenseDescription, price: parseInt(formState.price), expenseAuthor: formState.expenseAuthor },
      });
console.log(data);
window.location.reload()

    } catch (err) {
      console.error(JSON.stringify(err,null,2));
    }
    setFormState({
      tripId: tripId,
      expenseDescription: '',
      price: 0,
      expenseAuthor: '',
      quanitity: 0,
    })
  };



  return (
    <div className='expenseContainer'>
      <h4 className='expenseText'>Do you have any expenses to add?</h4>

      {Auth.loggedIn() ? (
      <>
      
        <p
          className={`m-0 ${error ? 'text-danger' : ''
            }`}
        >
          {error && <span className="ml-2">{error.message}</span>}
        </p>
        <>
        <form className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}>
          <InputGroup className="mb-3">

            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name= "expenseAuthor"
              value= {formState.expenseAuthor}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl 
            aria-label="Amount (to the nearest dollar)"
            name= "price"
            value={formState.price}
            onChange={handleChange} />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>

          <InputGroup>
            <InputGroup.Text>Expense Description</InputGroup.Text>
            <FormControl as="textarea" 
            aria-label="With textarea"
            name="expenseDescription"
            value={formState.expenseDescription}
            onChange={handleChange} />
          </InputGroup>
          <div className="col-12 add-expense-btn">
              <button className="btn btn-primary add-expense-btn" type="submit">
                Add Expense
              </button>
            </div>
            </form>
        </>
        {/* <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="expenseText"
                placeholder="Add an expense"
                value={formState.expenseDescription}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Expense
              </button>
            </div>
          </form> */}
      </>
       ) : ( 
      <p>
        You need to be logged in to share your thoughts. Please{' '}
        <Link to="/login">login</Link>
        {/* or <Link to="/signup">signup.</Link> */}
      </p>
)}
    </div>
  );
};

export default ExpenseForm;
