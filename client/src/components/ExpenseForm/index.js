import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { InputGroup, FormControl, Form } from 'react-bootstrap'

import { ADD_EXPENSE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const ExpenseForm = ({ tripId }) => {
  const [formState, setFormState] = useState({ expenseDescription: '', price: 0, expenseAuthor: '', quantity: 0 });

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
    console.log(formState)
    try {
      const { data } = await addExpense({
        variables: { ...formState },
      });


    } catch (err) {
      console.error(err);
    }
    setFormState({
      expenseDescription: '',
      price: 0,
      expenseAuthor: '',
      quanitity: 0,
    })
  };



  return (
    <div>
      <h4>Do you have any expenses to add?</h4>

      {/* {Auth.loggedIn() ? ( */}
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
          <Form.Select 
          aria-label="Default select example"
          name="quantity"
          value={formState.quantity}
          onChange={handleChange}>
            <option>Select the quantity</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>

          <InputGroup>
            <InputGroup.Text>Expense Description</InputGroup.Text>
            <FormControl as="textarea" 
            aria-label="With textarea"
            name="expenseDescription"
            value={formState.expenseDescription}
            onChange={handleChange} />
          </InputGroup>
          <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
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
      {/* // ) : ( */}
      <p>
        You need to be logged in to share your thoughts. Please{' '}
        <Link to="/login">login</Link>
        {/* or <Link to="/signup">signup.</Link> */}
      </p>
)
    </div>
  );
};

export default ExpenseForm;
