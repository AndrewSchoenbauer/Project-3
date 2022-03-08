import React from 'react';
import { Link } from 'react-router-dom';

const MyTrips = ({ user, title }) => {
console.log(user)
  return (
    <div>
      <h3 className='my-trip-title'>{title}</h3>
      {user &&
        user.trips.map((trip) => (
            
          <div key={trip._id} className="card mb-3 individual-trip">
            <h4 className="card-header p-2 m-0 individual-trip">
               <br className='individual-break-line'/>
            </h4>
            <div className="card-body p-2 individual-trip">
              <p className='individual-trip-name'>{trip.tripName}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared "
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