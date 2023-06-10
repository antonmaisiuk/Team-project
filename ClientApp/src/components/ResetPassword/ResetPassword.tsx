import React, { FC, useState, SyntheticEvent, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { StyledAuthContainer, StyledForm } from './style';
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [resetData, setResetData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        // Wywo³anie ¿¹dania GET do /reset-password na serwerze
        fetch(`https://localhost:44375/api/reset-password?token=${token}&email=${email}`)
            .then(response => response.json())
            .then(data => {
                setResetData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Sprawdzanie, czy has³o i powtórzone has³o s¹ zgodne
        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match');
            return 0;
        }

        if (resetData === null) {
            // Obs³uga przypadku, gdy resetData ma wartoœæ null
            console.error('Reset data is null');
            return 0;
        }

        // Wywo³anie ¿¹dania POST do /reset-password na serwerze
        const response = await fetch('https://localhost:44375/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: resetData.model.token,
                email: resetData.model.email,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setErrorMsg('');
            setSuccessMsg('Success');
            console.log(data);
        } else {
            const errorData = await response.json();
            setErrorMsg('Something went wrong');
            console.error(errorData);
        }
    };

    return (
        <StyledAuthContainer>
            <StyledForm>
                <div>
                    <h1>Reset Password</h1>
                    <Form onSubmit={handleResetPassword}>
                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                        {successMsg && <Alert variant="success">{successMsg}</Alert>}
                        {successMsg && (
                            <Button variant="primary" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                        )}
                        <Button variant="primary" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                </div>
            </StyledForm>
        </StyledAuthContainer>
    );
};

export default ResetPassword;