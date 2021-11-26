import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import LoaderSpinner from '../../../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../../../Shared/AlertMessages/AlertMessages';

const UserOrders = () => {
    const { user, loading } = useAuth()

    const [orders, setOrders] = useState([]);
    const [isAction, setAction] = useState(false);

    const [spinner, setSpinner] = useState(false);
    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);

    // Set Action Status Before API call
    const beforeAPICall = () => {
        setSpinner(true);
        setSuccessAction(false);
        setErrorAction(false);
    }
    const afterAPISuccessCall = () => {
        setSpinner(false);
        setSuccessAction(true);
    }
    const afterAPIFailedCall = () => {
        setSpinner(false);
        setErrorAction(true);
    }
    useEffect(() => {
        beforeAPICall();
        let url = `https://theicepoint.herokuapp.com/orders?email=${user.email}`;
        axios.get(url)
            .then(result => {
                if (result?.data?.status === 'not found') {
                    afterAPIFailedCall();
                }
                else {
                    setOrders(result.data)
                }
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    }, [isAction, user?.email])

    const handleProduct = (orderID, actionType) => {
        // Set Action status after api success response, if true then useEffect call again to load data 
        setAction(false)

        const prompt = window.confirm(`Do You Want To ${actionType.toUpperCase()}?`)
        if (prompt) {
            beforeAPICall();
            if (actionType === 'delete') {
                axios.delete(`https://theicepoint.herokuapp.com/orders/${orderID}`)
                    .then(result => {
                        if (result?.data?.deletedCount) {
                            afterAPISuccessCall();
                            setAction(true);
                        }
                        else {
                            afterAPIFailedCall();
                        }
                    })
                    .catch(e => { afterAPIFailedCall() })
                    .finally(() => { setSpinner(false) });
            }
            else {
                axios.put(`https://theicepoint.herokuapp.com/orders/${orderID}`, { actionType })
                    .then(result => {
                        if (!result?.data?.status === 'not found' || result?.data?.modifiedCount) {
                            afterAPISuccessCall();
                            setAction(true);
                        }
                        else {
                            afterAPIFailedCall();
                        }
                    })
                    .catch(e => { afterAPIFailedCall() })
                    .finally(() => { setSpinner(false) });
            }
        }
        else return
    };

    return (
        <>
            <div className="container-fluid p-5">
                <h1 className="text-center mt-3">All Orders Lists</h1>
                {/* Success and Error Message  */}
                <AlertMessages
                    errorAction={errorAction}
                    setErrorAction={setErrorAction}
                    successAction={successAction}
                    setSuccessAction={setSuccessAction}
                ></AlertMessages>
                <div className="row">
                    <div className="col-12 table-responsive">
                        <table className="table table-sm table-info table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">FullName</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Picture</th>
                                    <th scope="col">Order Status</th>
                                    <th scope="col">Cancel</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            {
                                spinner ? <>
                                    <span className="text-center fw-bold fs-2">Please Wait!!!!!!</span>
                                    <LoaderSpinner></LoaderSpinner>
                                </>
                                    :
                                    <tbody>
                                        {
                                            orders?.map((singleOrder, index) => {
                                                const {
                                                    _id,
                                                    item,
                                                    unitPrice,
                                                    picture,
                                                    fullName,
                                                    contact,
                                                    address,
                                                    status,
                                                    userName,
                                                    email,
                                                    icecreamID
                                                } = singleOrder || {};
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item}</td>
                                                        <td>{fullName}</td>
                                                        <td>{unitPrice || 'N/A'}</td>
                                                        <td>
                                                            <img
                                                                src={picture}
                                                                alt={item}
                                                                style={{
                                                                    width: '30px',
                                                                    height: '35px'
                                                                }} />
                                                        </td>
                                                        <td>{status}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-primary w-100"
                                                                onClick={() => handleProduct(_id, 'cancel')}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-primary w-100"
                                                                onClick={() => handleProduct(_id, 'delete')}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <Link to={`/user/update/order/${_id}`}
                                                                className="btn btn-sm btn-primary w-100">
                                                                Update</Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOrders;