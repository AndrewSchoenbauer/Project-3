import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import UserForm from '../components/UserForm'
import { QUERY_SINGLETRIP } from '../utils/queries';
// import { QUERY_USER } from '../utils/queries';


const SingleTrip = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { tripId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLETRIP, {
    // pass URL parameter
    variables: { tripId: tripId },
  });
// const {loading, data} = useQuery(QUERY_USER,{
//   variables: {userId: userId}
// })
  const trip = data?.trip || {};
  // console.log(trip.users.username)
  const expenseCreator = (item) => {
    return <ExpenseList 
    key={item._id}
    expenseDescription={item.expenseDescription}
    price= {item.price}
    quantity={item.quantity}
    expenseAuthor={item.expenseAuthor}  />;
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    
    <div className="my-3">
     
      <h3 className="card-header bg-dark text-light p-2 m-0">
         <br />
        <span style={{ fontSize: '1rem' }}>
          Your Trip ({trip.startDate}) - ({trip.endDate})
        </span>
      </h3>
      <div className="t py-4">
        <blockquote
          className="p-4"
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '3rem',
            fontStyle: 'italic',
            border: '2px solid #1a1a1a',
            lineHeight: '1.0',
          }}
        >
          {trip.tripName}

        </blockquote>
      </div>

      
      <div className="m-3 p-4" >
        <ExpenseForm tripId={tripId} expenses={trip.expenses}/>

      </div>
      <div>
        <UserForm tripId={tripId}></UserForm>
      </div>
      <div>
            <h1 className='expenseText' >Total Expenses: </h1>
            {trip.expenses.map(expenseCreator)}
          </div>
    </div>
  );
};

export default SingleTrip;
