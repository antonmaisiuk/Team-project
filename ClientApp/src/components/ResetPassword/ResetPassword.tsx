import React, { useState, useEffect } from 'react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [resetData, setResetData] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        // Wywo�anie ��dania GET do /reset-password na serwerze
        fetch(`https://localhost:44375/api/reset-password?token=${token}&email=${email}`)
            .then(response => response.json())
            .then(data => {
                // Przetwarzanie danych o resetowaniu has�a
                setResetData(data);
            })
            .catch(error => {
                // Obs�uga b��du ��dania
                console.error(error);
            });
    }, []);

    const handleResetPassword = async () => {
        // Sprawdzanie, czy has�o i powt�rzone has�o s� zgodne
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (resetData === null) {
            // Obs�uga przypadku, gdy resetData ma warto�� null
            console.error('Reset data is null');
            return;
        }

        // Wywo�anie ��dania POST do /reset-password na serwerze
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
            // Wy�wietlanie informacji o powodzeniu resetowania has�a
            console.log(data);
        } else {
            const errorData = await response.json();
            // Wy�wietlanie informacji o b��dzie resetowania has�a
            console.error(errorData);
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="button" onClick={handleResetPassword}>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;