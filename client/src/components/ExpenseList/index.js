import React from 'react';
import {Accordion, Card, Button} from 'react-bootstrap'
const ExpenseList = (props) => {
    console.log(props)
//   if (!expenses.length) {
//     return <h3>No Items Yet</h3>;
//   }

  return (
    <>
    
      {/* <div className="flex-row my-4">
        {expenses &&
          expenses.map((expense) => (
            <div key={expense._id} className="col-4 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {expense.expenseAuthor} added{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                     {expense.expenseDescription}
                  </span>
                </h5>
                {/* <p className="card-body">{expense.expenseDescription}</p> */}
              {/* </div>
            </div>
          ))}
      </div> */} 
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