import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_TRIP } from '../utils/mutations';

import Auth from '../utils/auth';




const Trip = () => {
    const [formState, setFormState] = useState({
        tripName: '',
        startDate: '',
        endDate: '',
    });
    const [addTrip, { error, data }] = useMutation(ADD_TRIP);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addTrip({
                variables: { tripName: formState.tripName, startDate: formState.startDate, endDate: formState.endDate },
            });


        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Create a Trip!</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="Trip Name"
                                    name="tripName"
                                    type="text"
                                    value={formState.tripName}
                                    onChange={handleChange}
                                />
                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group controlId="dob">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control type="date" name="startDate" placeholder="Start Date" value={formState.startDate} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group controlId="dob">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control type="date" name="endDate" placeholder="Start Date" value={formState.endDate} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form >
                        )}
                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Trip;