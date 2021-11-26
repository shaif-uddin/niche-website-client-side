import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../Shared/AlertMessages/AlertMessages';

const ExploreInHomePage = () => {
    const [icecreams, setIceCreams] = useState([]);
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
        let url = "https://theicepoint.herokuapp.com/icecreams?limit=6";
        axios.get(url)
            .then(result => {
                setIceCreams(result.data)
                setSpinner(false)
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    }, [])

    return (
        <>
            <div class="container p-3">
                <h3 className="text-center py-3">Exploring Ice<span className="text-info fw-bold">Creams</span></h3>
                <AlertMessages
                    errorAction={errorAction}
                    setErrorAction={setErrorAction}
                    successAction={successAction}
                    setSuccessAction={setSuccessAction}
                ></AlertMessages>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        spinner ? <>
                            <span className="text-center fw-bold fs-2">Please Wait!!!!!!</span>
                            <LoaderSpinner></LoaderSpinner>
                        </>
                            : <>
                                {icecreams?.map((singleIceCream, index) => {
                                    const {
                                        _id,
                                        title,
                                        unitPrice,
                                        picture,
                                        overview
                                    } = singleIceCream || {};
                                    return (
                                        <div class="col">
                                            <div class="card h-100 shadow-sm">
                                                <img src={picture} class="card-img-top" width="100%" height="225" />
                                                <div class="card-body">
                                                    <h5 className="card-title">{title}</h5>
                                                    <p className="text-info fw-bold fs-2 text-center">${unitPrice}</p>
                                                    <p class="card-text">{overview}</p>
                                                </div>
                                                <div class="card-footer">
                                                    <div class="btn-group">
                                                        {/* <button type="button" class="btn btn-sm btn-outline-secondary">Details</button> */}
                                                        <Link to={`/purchase/icecream/${_id}`}>
                                                            <button type="button" class="btn btn-sm btn-primary">Order Now</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </>
                    }
                </div>
            </div>

        </>
    );
};

export default ExploreInHomePage;