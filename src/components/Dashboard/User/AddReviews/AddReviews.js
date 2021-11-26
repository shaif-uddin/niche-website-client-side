import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import LoaderSpinner from '../../../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../../../Shared/AlertMessages/AlertMessages';

const AddReviews = () => {
    const { user } = useAuth()
    const [spinner, setSpinner] = useState(false);
    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);
    const { register, reset, handleSubmit } = useForm();
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
    const onSubmit = data => {
        const copyReview = { ...data }
        copyReview['email'] = user.email
        copyReview['commentBy'] = data.commentBy || user.displayName
        // Set Spinner True To Display until Data loaded, Error and Success Previous Message cleared 
        beforeAPICall();
        axios.post('https://theicepoint.herokuapp.com/reviews', copyReview)
            .then(response => {
                if (response?.data?.insertedId) {
                    afterAPISuccessCall();
                    reset();
                }
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    }
    return (
        <>
            <div className="p-5 container mt-5">
                <h1 className="text-center fw-bold">Review Add Panel</h1>
                {/* Success and Error Message  */}
                <AlertMessages
                    errorAction={errorAction}
                    setErrorAction={setErrorAction}
                    successAction={successAction}
                    setSuccessAction={setSuccessAction}
                ></AlertMessages>
                <div className="row">
                    <div className="col-12 col-md-8 mx-auto">
                        {
                            spinner ? <>
                                <span className="text-center fw-bold fs-2">Please Wait, Data saved in processing</span>
                                <LoaderSpinner></LoaderSpinner>
                            </>
                                :
                                <form className="d-flex flex-column gap-1" onSubmit={handleSubmit(onSubmit)}>
                                    <label className="text-start">Subject</label>
                                    <input {...register("subject",)} placeholder="Add Review Subjet Here" />
                                    <label className="text-start">Your Rating</label>
                                    <input required type="number" defaultValue="3" min="1" max="5" {...register("rating",)} placeholder="Rating Point" />
                                    <label className="text-start">Full Name</label>
                                    <input required defaultValue={user?.displayName} {...register("commentBy",)} />

                                    <label className="text-start">Email</label>
                                    <input type="email" defaultValue={user?.email} readOnly />
                                    <label className="text-start">Your Reviews (Type Here)</label>
                                    <textarea required cols="5" {...register("message",)} placeholder="Provide Your Review" />
                                    <input className="btn btn-primary fw-bold mt-1 d-block mx-auto " type="submit" value="Submit Review" />
                                </form>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddReviews;