import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../Hooks/useAuth';

// Get Firebase Authentication method 
const Registration = () => {
  const {
    auth,
    setUser,
    setUserInfo,
    error,
    setError,
    signWithGoogle,
    signWithGithub,
    createNewUser,
  } = useAuth();
  // Set email when user provide email and password in input field 
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState('Anonymous');
  // Set Location to keep previously visited page history
  const location = useLocation();
  const history = useHistory();
  const redirect_uri = location.state?.from || '/home';
  // To Switch between Login and Registration Form 
  const handleToggleCheckbox = () => {
    history.push('/login');
  }
  // Get input field value 
  const getInputValue = e => {
    if (e.target.type === 'text')
      setUserName(e.target.value)
    else if (e.target.type === 'email')
      setMail(e.target.value)
    else
      setPassword(e.target.value)
  }
  // Create New User Account 
  const handleRegistration = (e) => {
    e.preventDefault();
    createNewUser(mail, password)
      .then((response) => {
        setUserInfo(userName)
        setUser(auth.currentUser)
        setError('');
        history.push(redirect_uri);
      })
      .catch(error => {
        setError(error.message)
      })
  }
  // Sign In With Google PopUp 
  const handleGoogleSignIn = () => {
    signWithGoogle()
      .then(() => {
        setError('');
        history.push(redirect_uri);
      })
  }
  // Sign In With Github PopUp 
  const handleGithubSignIn = () => {
    signWithGithub()
      .then(() => {
        setError('');
        history.push(redirect_uri);
      })
      .catch(error => {
        setError(error.message)
      })
  }
  return (
    <>
      <div className="container p-5">
        <h1 className="text-center">Registration</h1>
        {
          error?.length ? <p className="h1 text-danger">{error}</p> : ''}
        <Form onSubmit={handleRegistration}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter email" onChange={getInputValue} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={getInputValue} required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={getInputValue} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Already Have Account?" onChange={handleToggleCheckbox} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Button className="mt-2" onClick={handleGoogleSignIn} variant="secondary" size="sm">Google Login</Button>

      </div>
    </>
  );
};

export default Registration;