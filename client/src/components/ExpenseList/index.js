import React from 'react';
import {Accordion, Card, Button} from 'react-bootstrap'
// import { useMutation } from '@apollo/client';
// import { REMOVE_EXPENSE } from '../../utils/mutations';
const ExpenseList = (props) => {
    console.log(props)
    // const [removeExpense, { error }] = useMutation(REMOVE_EXPENSE);
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
        
    //     try {
    //       const  {data}  = await removeExpense({
    //         variables: {  tripId: formState.tripId, expenseDescription: formState.expenseDescription, price: parseInt(formState.price), quantity: parseInt(formState.quantity), expenseAuthor: formState.expenseAuthor },
    //       });
    // console.log(data);
    
    //     } catch (err) {
    //       console.error(JSON.stringify(err,null,2));
    //     }
    //   };
  return (
    <>
    <div>
      <Accordion>
        <Card>
        
            <Accordion.Header as={Button} variant="link" eventKey="0">
              {props.expenseDescription} 
            </Accordion.Header>
            <Accordion.Body>
              Price: {props.price}<br/>
              Quantity: {props.quantity}<br/>
              Added By: {props.expenseAuthor}<br/>
            </Accordion.Body>
        </Card>
      </Accordion>
    </div>


    </>
  );
};

export default ExpenseList;