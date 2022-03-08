import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import MyTrips from '../components/MyTrip';


import { QUERY_USER } from '../utils/queries';

const Profile = () => {
  const  {loading,data} = useQuery(QUERY_USER,{ 
    variables:{
        username: Auth.getProfile().data.username
    }});
  console.log(data)
  const user = data?.user|| {};

  return (
    <main>
      <div className="flex-row justify-center my-trip-box">
        <div className="col-12 col-md-8 mb-3 my-trip-container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <MyTrips
              user={user}
              title="Your Trips"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;