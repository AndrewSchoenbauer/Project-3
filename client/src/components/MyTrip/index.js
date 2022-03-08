import React from 'react';
import { Link } from 'react-router-dom';

const MyTrips = ({ user, title }) => {
console.log(user)
  return (
    <div>
      <h3>{title}</h3>
      {user &&
        user.trips.map((trip) => (
            
          <div key={trip._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
               <br />
            </h4>
            <div className="card-body bg-light p-2">
              <p>{trip.tripName}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/trips/${trip._id}`}
            >
              Go here to edit your trip!
            </Link>
          </div>
        ))}
    </div>
  );
};

export default MyTrips;