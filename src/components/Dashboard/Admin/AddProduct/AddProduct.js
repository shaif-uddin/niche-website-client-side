import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoaderSpinner from '../../../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../../../Shared/AlertMessages/AlertMessages';

const AddProduct = () => {
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
        // Set Spinner True To Display until Data loaded, Error and Success Previous Message cleared 
        beforeAPICall();
        axios.post('https://theicepoint.herokuapp.com/icecreams', data)
            .then(response => {
                console.log(response)
                if (response?.data?.insertedId) {
                    reset();
                    afterAPISuccessCall();
                }
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    }
    return (
        <>
            <div className="p-5 container mt-5">
                <h1 className="text-center fw-bold">Ice Cream Add Panel</h1>
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
                                    <label className="text-start">Ice Cream Title</label>
                                    <input required {...register("title",)} placeholder="Add Ice Cream Name" />
                                    <label className="text-start">Approx Cost (USD)</label>
                                    <input required type="number" defaultValue="10" min="1" {...register("unitPrice",)} placeholder="Unit Price" />
                                    <label className="text-start">Picture URL</label>
                                    <input required {...register("tourpicture",)} placeholder="Product Related Picture" />
                                    <label className="text-start">Overview</label>
                                    <textarea {...register("overview",)} placeholder="Short Overview" />
                                    <input className="btn btn-primary fw-bold mt-1 d-block mx-auto " type="submit" value="Submit Product" />
                                </form>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;