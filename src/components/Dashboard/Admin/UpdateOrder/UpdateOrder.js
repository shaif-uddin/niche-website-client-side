import axios from 'axios';
import React, { useState, useEffect, } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import Header from '../../../Header/Header';
import LoaderSpinner from '../../../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../../../Shared/AlertMessages/AlertMessages';
import Dashboard from '../../Dashboard/Dashboard';

const UpdateOrder = () => {
    const { orderID } = useParams();
    const [order, setOrder] = useState({});
    const [isDataStored, setIsDataStored] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    // Check if any changes made in update operation 
    const [noChangesInUpdate, setNoChangesInUpdate] = useState(true);

    // if update form just submit without any change made 
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
        axios.get(`https://theicepoint.herokuapp.com/orders/${orderID}`)
            .then(result => {
                setOrder(result.data);
                setSpinner(false)
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    }, [orderID]);

    // Another useEffect, if Server response with data and set to getState then again re-render page
    // to show value in form 
    useEffect(() => {
        setIsDataStored(true);
    }, [order]);

    const onSubmit = data => {
        beforeAPICall();
        // By Default assume user click on submit after atleast change one field value
        setNoChangesInUpdate(true);
        console.log('Get Update: ', data)
        axios.put(`https://theicepoint.herokuapp.com/orders`, data)
            .then(result => {
                console.log('Update Result ', result)
                if (result?.data?.modifiedCount) {
                    afterAPISuccessCall();
                    // history.push(`/admin/show/orders`);
                }
                else if (!result?.data?.modifiedCount && result?.data?.matchedCount) {
                    setNoChangesInUpdate(false)
                }
                else {
                    afterAPIFailedCall();
                }
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    };

    return (
        <>
            <Header></Header>
            <div className="container p-5">
                <h3 className="text-center mt-3">Update Order Information</h3>
                {/* Success and Error Message  */}
                <AlertMessages
                    errorAction={errorAction}
                    setErrorAction={setErrorAction}
                    successAction={successAction}
                    setSuccessAction={setSuccessAction}
                ></AlertMessages>
                {
                    !noChangesInUpdate && <div class="alert alert-info alert-dismissible fade show" role="alert">
                        <strong>Hey!</strong> No Action Done as No Changes Found In Data.
                        <button onClick={() => setNoChangesInUpdate(true)} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }
                {
                    // Wait For Data from server, if server data set to getTour then useEffect of getTour dependency call
                    // Where action set to true, that means data ready to displayed in page 
                    spinner ? <>
                        <span className="text-center fw-bold fs-2">Please Wait!!!!!!</span>
                        <LoaderSpinner></LoaderSpinner>
                    </>
                        : isDataStored &&
                        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
                            <input defaultValue={orderID} {...register("_id",)} hidden />
                            <label className="text-start fw-bold">Item Ordered</label>
                            <input defaultValue={order?.item} disabled />
                            <label className="text-start fw-bold">Unit Price</label>
                            <input defaultValue={order.unitPrice} {...register("unitPrice",)} />
                            <label className="text-start fw-bold">Full Name</label>
                            <input defaultValue={order.fullName} {...register("fullName",)} />
                            <label className="text-start fw-bold">Contact</label>
                            <input defaultValue={order.contact} {...register("contact",)} />
                            <label className="text-start fw-bold">Shipping Address</label>
                            <input defaultValue={order.address} {...register("address",)} />
                            <label className="text-start fw-bold">Order Status</label>
                            <select defaultValue={order.status} {...register("status")}>
                                <option value="cancel">Cancel</option>
                                <option value="confirm">Confirm</option>
                                <option value="pending">Pending</option>
                            </select>
                            <input type="submit" />
                        </form>

                }
            </div>
        </>
    );
};

export default UpdateOrder;