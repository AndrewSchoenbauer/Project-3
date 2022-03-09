import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Form } from 'react-bootstrap'
import { ADD_USER_TO_TRIP } from '../../utils/mutations';

import Auth from '../../utils/auth';
import { QUERY_USERS } from '../../utils/queries'
const UserForm = ({ tripId }) => {
    const { loading, data } = useQuery(QUERY_USERS)
    const users = data?.users || [];
    console.log(users)
    const [formState, setFormState] = useState({ tripId: tripId, userId: "" });
    const [addUserToTrip, { error }] = useMutation(ADD_USER_TO_TRIP);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target)
        setFormState({
            ...formState,
            [name]: value,
        })

    };
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        console.log(formState)
        try {
            const { data } = await addUserToTrip({
                variables: { tripId: formState.tripId, userId: formState.userId },
            });
            window.location.reload()

        } catch (err) {
            console.error(JSON.stringify(err, null, 2));

        }
    };
    return (
        <form className='userContainer' onSubmit={handleFormSubmit}>
            <Form.Select aria-label="Default select example" onChange={handleChange} name="userId">
                <option>Click here to add user</option>
                {users.map((user) => (
                    <option data-id={user._id} value={user._id} >{user.username}</option>))}
            </Form.Select>
            <div className="col-5 add-expense-btn ">
                <button className="btn btn-block py-3 add-expense-btn" type="submit">
                    Add User
                </button>
            </div>
        </form>
    )
}
export default UserForm