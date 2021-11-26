import React from 'react';

const AlertMessages = (props) => {
    const { errorAction, setErrorAction, successAction, setSuccessAction } = props || {}
    return (
        <>
            {
                errorAction && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Failed!</strong> To Perform Action.
                    <button onClick={() => setErrorAction(false)} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            {
                successAction && <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Welcome!</strong> Action Done Successfully.
                    <button onClick={() => setSuccessAction(false)} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
        </>
    );
};

export default AlertMessages;