import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import useAuth from '../../Hooks/useAuth';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../Shared/AlertMessages/AlertMessages';

const Reviews = () => {
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
        let url = `https://theicepoint.herokuapp.com/reviews`;
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
            <div className="container p-5">
                <h3 className="text-center mt-3 mb-4">Reviews</h3>
                {/* Success and Error Message  */}
                <AlertMessages
                    errorAction={errorAction}
                    setErrorAction={setErrorAction}
                    successAction={successAction}
                    setSuccessAction={setSuccessAction}
                ></AlertMessages>
                <div className="row">
                    <div className="col-12">
                        <>
                            {
                                spinner ? <>
                                    <span className="text-center fw-bold fs-2">Wait For Review!!!!!!</span>
                                    <LoaderSpinner></LoaderSpinner>
                                </>
                                    :
                                    <>
                                        <div className="row">
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
                                                        <>
                                                            <figure class="text-center bg-info col-md-5 shadow-lg border border-end border-3 mx-auto">
                                                                <h4 className="p-2">
                                                                    <Rating
                                                                        className="text-center d-block text-success"
                                                                        emptySymbol={
                                                                            <i class="far fa-star"></i>
                                                                        }
                                                                        fullSymbol={
                                                                            <i class="fas fa-star"></i>
                                                                        }
                                                                        initialRating={rating}
                                                                        readonly
                                                                    />
                                                                </h4>
                                                                <blockquote class="blockquote">
                                                                    <p>{message}</p>
                                                                </blockquote>
                                                                <figcaption class="blockquote-footer mt-2">{commentBy.toUpperCase()}</figcaption>
                                                            </figure>
                                                        </>
                                                    )
                                                })}
                                        </div>
                                    </>
                            }
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reviews;