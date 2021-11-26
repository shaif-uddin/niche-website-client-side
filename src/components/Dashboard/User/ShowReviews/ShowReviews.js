import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import LoaderSpinner from '../../../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../../../Shared/AlertMessages/AlertMessages';

const ShowReviews = () => {
    const { user, loading } = useAuth()

    const [reviews, setReviews] = useState([]);
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
        let url = `https://theicepoint.herokuapp.com/reviews?email=${user.email}`;
        axios.get(url)
            .then(result => {
                if (result?.data?.status === 'not found') {
                    afterAPIFailedCall();
                }
                else {
                    setReviews(result.data)
                }
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    }, [isAction, user?.email])

    const handleReview = (reviewID, actionType) => {
        // Set Action status after api success response, if true then useEffect call again to load data 
        setAction(false)
        const prompt = window.confirm(`Do You Want To Delete Review?`)
        if (prompt) {
            beforeAPICall();
            axios.delete(`https://theicepoint.herokuapp.com/reviews/${reviewID}`)
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
        else return
    };

    return (
        <>
            <div className="container-fluid p-5">
                <h1 className="text-center mt-3">All Reviews By {user?.displayName || user?.email}</h1>
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
                                    <th scope="col">Subject</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Comment By</th>
                                    <th scope="col">Delete</th>
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
                                            reviews?.map((singleReview, index) => {
                                                const {
                                                    _id,
                                                    subject,
                                                    rating,
                                                    commentBy,
                                                    message
                                                } = singleReview || {};
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{subject || 'No Subject'}</td>
                                                        <td>{rating}</td>
                                                        <td>{message}</td>
                                                        <td>{commentBy}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-primary w-100"
                                                                onClick={() => handleReview(_id, 'delete')}
                                                            >
                                                                Delete
                                                            </button>
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

export default ShowReviews;