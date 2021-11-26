import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import LoaderSpinner from '../../../LoaderSpinner/LoaderSpinner';
import AlertMessages from '../../../Shared/AlertMessages/AlertMessages';

const MakeAdmin = () => {
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
        const copyData = { ...data }
        copyData['authorizedBy'] = user.email
        copyData['role'] = 'admin'

        // Set Spinner True To Display until Data loaded, Error and Success Previous Message cleared 
        beforeAPICall();
        console.log(copyData)
        axios.put('https://theicepoint.herokuapp.com/user/admin', copyData)
            .then(response => {
                console.log(response)
                if (response?.data?.upsertedCount || response?.data?.modifiedCount || response?.data?.upsertedId) {
                    reset();
                    afterAPISuccessCall();
                }
            })
            .catch(e => { afterAPIFailedCall() })
            .finally(() => { reset(); setSpinner(false) });
    }
    return (
        <>
            <div className="p-5 container mt-5">
                <h1 className="text-center fw-bold">Make Admin Panel</h1>
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
                                    <label className="text-start">Email</label>
                                    <input type="email" required {...register("email",)} placeholder="Add Email" />
                                    <label className="text-start">Password</label>
                                    <input required type="password" {...register("pass",)} placeholder="Pass For Admin Role" />
                                    <label className="text-start">Full Name</label>
                                    <input required {...register("userName",)} />
                                    <input className="btn btn-danger fw-bold mt-1 d-block mx-auto " type="submit" value="Make Admin" />
                                </form>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default MakeAdmin;