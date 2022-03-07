import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
import ExpenseForm from '../components/ExpenseForm';

import { QUERY_SINGLETRIP } from '../utils/queries';

const SingleTrip = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { tripId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLETRIP, {
    // pass URL parameter
    variables: { tripId: tripId },
  });

  const trip = data?.trip || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
         <br />
        <span style={{ fontSize: '1rem' }}>
          Your Trip
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {trip.tripName}
        </blockquote>
      </div>

      {/* <div className="my-5">
        <CommentList comments={thought.comments} />
      </div> */}
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <ExpenseForm tripId={trip._id} expenses={trip.expenses}/>

      </div>
    </div>
  );
};

export default SingleTrip;
