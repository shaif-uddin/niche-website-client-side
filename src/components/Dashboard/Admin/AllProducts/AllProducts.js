import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoaderSpinner from '../../../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../../../Shared/AlertMessages/AlertMessages';

const AllProducts = () => {
    const [icecreams, setIceCreams] = useState([]);

    const [isDelete, setIsDelete] = useState(false);
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
        let url = "https://theicepoint.herokuapp.com/icecreams";
        axios.get(url)
            .then(result => {
                console.log(result)
                setIceCreams(result.data)
                setSpinner(false)
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { setSpinner(false) });
    }, [isDelete])

    const handleDeleteProduct = (icecreamID) => {
        // Set Delete Action status, if true then useEffect call again to load data 
        setIsDelete(false)

        const prompt = window.confirm('Do You Want To Delete?')
        if (prompt) {
            beforeAPICall();
            axios.delete(`https://theicepoint.herokuapp.com/icecreams/${icecreamID}`)
                .then(result => {
                    if (result?.data?.deletedCount) {
                        afterAPISuccessCall();
                        setIsDelete(true);
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
                <h1 className="text-center mt-3">All IceCream Lists</h1>
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
                                    <th scope="col">Title</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Picture</th>
                                    <th scope="col">Update</th>
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
                                            icecreams?.map((singleIceCream, index) => {
                                                const {
                                                    _id,
                                                    title,
                                                    unitPrice,
                                                    picture
                                                } = singleIceCream || {};
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{title}</td>
                                                        <td>{unitPrice}</td>
                                                        <td>
                                                            <img
                                                                src={picture}
                                                                alt={title}
                                                                style={{
                                                                    width: '30px',
                                                                    height: '35px'
                                                                }} />
                                                        </td>
                                                        <td>
                                                            <Link to={`/admin/update/icecream/${_id}`}
                                                                className="btn btn-sm btn-primary w-100">
                                                                Update</Link>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-primary w-100"
                                                                onClick={() => handleDeleteProduct(_id)}
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

export default AllProducts;