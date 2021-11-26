import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useAuth from './../../Hooks/useAuth';

// Get Firebase Authentication method 
const Login = () => {
  const {
    error,
    setError,
    signWithGoogle,
    signWithGithub,
    signWithEmailPass,
    loadingAdmin,
    setLoadingAdmin,
    isAdmin,
    setIsAdmin
  } = useAuth();

  // Set email when user provide email and password in input field 
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  // Set Location to keep previously visited page history 
  const location = useLocation();
  const history = useHistory();
  const redirect_uri = location.state?.from || '/';

  // To Switch between Login and Registration Form 
  const handleToggleCheckbox = () => {
    history.push('/register');
  }
  // Get input field value 
  const getInputValue = e => {
    if (e.target.type === 'email')
      setMail(e.target.value)
    else
      setPassword(e.target.value)
  }

  // Sign In By Providing Email and Password 
  const handleSignIn = (e) => {
    e.preventDefault();
    signWithEmailPass(mail, password)
      .then((response) => {
        setError('');
        let url = `https://theicepoint.herokuapp.com/admin?email=${response.user.email}`;
        axios.get(url)
          .then(result => {
            if (result.data) {
              setIsAdmin(true);
            }
          })
          .finally(() => setLoadingAdmin(false))
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
      .catch(error => {
        setError(error.message)
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
        <h1 className="text-center">Sign-In</h1>
        {
          error?.length ? <p className="h1 text-danger">{error}</p> : ''}
        <Form onSubmit={handleSignIn}>
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
            <Form.Check type="checkbox" label="Create New Account?" onChange={handleToggleCheckbox} />
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

export default Login;