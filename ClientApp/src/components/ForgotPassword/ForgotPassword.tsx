import React, { FC, useState, SyntheticEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

interface ForgotPasswordProps {
    className?: string;
}



const ForgotPassword: FC<ForgotPasswordProps> = ({ className }) => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                setSuccessMsg('An email has been sent to your email address with instructions on how to reset your password.');
            } else {
                const error = await response.json();
                setErrorMsg(error.message);
            }
        } catch (error) {
            console.error(error);
            setErrorMsg('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className={className}>
            <h1>Forgot Password</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                {successMsg && <Alert variant="success">{successMsg}</Alert>}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default ForgotPassword;