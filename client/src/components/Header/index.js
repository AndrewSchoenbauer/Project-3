import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Split It Up</h1>
          </Link>

        </div>
        <div>
          {Auth.loggedIn() ? (
            <div className='message'>
              <span className='nav-message'>Hey there, {Auth.getProfile().data.username}!</span>
              <Link to="/addTrip"><button className="btn btn-lg btn-light m-2">
                Add Trip
              </button>
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <div className='btns'>
                <Link className="btn btn-lg btn-info m-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-lg btn-light m-2" to="/signup">
                  Signup
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

