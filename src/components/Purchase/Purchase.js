import axios from 'axios';
import React, { useState, useEffect, } from 'react';
import { useHistory, useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Header from '../Header/Header';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../Shared/AlertMessages/AlertMessages';

const Purchase = () => {
    const { user } = useAuth()
    const { icecreamID } = useParams();
    const [icecream, setIceCream] = useState({});
    const [data, setData] = useState({})
    const history = useHistory();
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
        axios.get(`https://theicepoint.herokuapp.com/icecreams/${icecreamID}`)
            .then(result => {
                setIceCream(result.data);
                setSpinner(false);
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    }, [icecreamID]);

    const inputFieldData = (e) => {
        const copyData = ({ ...data })
        copyData[e.target.name] = e.target.value;
        setData(copyData)
    }

    const handlePurchaseForm = (e) => {
        e.preventDefault()
        const getFinalData = { ...data }
        getFinalData['status'] = 'pending'
        getFinalData['userName'] = user.displayName
        getFinalData['email'] = user.email
        getFinalData['item'] = icecream.title
        getFinalData['unitPrice'] = icecream.unitPrice
        getFinalData['icecreamID'] = icecream._id
        beforeAPICall();

        axios.post(`https://theicepoint.herokuapp.com/orders`, getFinalData)
            .then(result => {
                console.log('Server Result', typeof result.data.status)
                if (result?.data?.status === 404) {
                    afterAPIFailedCall();
                }
                else {
                    afterAPISuccessCall()
                    // history.push(`/user/show/orders`);
                }
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    };

    return (
        <>
            <Header></Header>
            <div className="container p-3">
                <h3 className="text-center mt-3">Update Tour Information</h3>
                {/* Success and Error Message  */}
                <AlertMessages
                    errorAction={errorAction}
                    setErrorAction={setErrorAction}
                    successAction={successAction}
                    setSuccessAction={setSuccessAction}
                ></AlertMessages>
                <div className="col-12 col-md-6 mx-auto">
                    {
                        spinner ?
                            <>
                                <span className="text-center fw-bold fs-2">Please Wait!!!!!!</span>
                                <LoaderSpinner></LoaderSpinner>
                            </>
                            :
                            <form class="needs-validation" onSubmit={handlePurchaseForm} novalidate>
                                <div class="row g-3">
                                    <div class="col-sm-6 text-start">
                                        <label for="item" class="form-label">Item Name</label>
                                        <input type="text" class="form-control form-control-sm" id="item" defaultValue={icecream?.title} disabled />
                                    </div>
                                    <div class="col-sm-6 text-start">
                                        <label for="unitPrice" class="form-label">Unit Price(USD)</label>
                                        <input type="text" class="form-control form-control-sm" id="unitPrice" defaultValue={icecream?.unitPrice} disabled />
                                    </div>
                                    <div class="col-12 text-start">
                                        <label for="fullName" class="form-label">Full Name</label>
                                        <input onChange={inputFieldData} type="text" class="form-control form-control-sm" id="fullName" name="fullName" placeholder="Your Full Name" required />
                                    </div>
                                    <div class="col-sm-6 text-start">
                                        <label for="userName" class="form-label">User Name</label>
                                        <input type="text" class="form-control form-control-sm" id="userName" defaultValue={user?.displayName} disabled />
                                    </div>
                                    <div class="col-6 text-start">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control form-control-sm" id="email" defaultValue={user?.email} disabled />
                                    </div>
                                    <div class="col-12 text-start">
                                        <label for="contact" class="form-label">Contact No</label>
                                        <input onChange={inputFieldData} type="text" class="form-control form-control-sm" id="contact" name="contact" />
                                    </div>
                                    <div class="col-12 text-start">
                                        <label for="address" class="form-label">Address</label>
                                        <textarea onChange={inputFieldData} type="text" class="d-block w-100" id="address" name="address" placeholder="1234 Main St" required />
                                    </div>
                                    <hr />
                                    <button class="w-100 btn btn-primary btn-lg" type="submit">Checkout</button>
                                </div>
                            </form>
                    }
                </div>
            </div>
        </>
    );
};

export default Purchase;