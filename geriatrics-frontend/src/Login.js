import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('login');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async () => {
        try {
            const endpoint = mode === 'login' ? 'login' : 'register';
            const payload = mode === 'login'
                ? { email, password }
                : { email, password, firstName, lastName };

            const res = await axios.post(
                `http://localhost:3000/api/auth/${endpoint}`,
                payload
            );

            localStorage.setItem('token', res.data.token);
            alert('SUCCESS! Token: ' + res.data.token.substring(0, 20) + '...');
        } catch (err) {
            alert('Failed: ' + (err.response?.data?.error || 'Check backend'));
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0A0E27 0%, #1A1F3A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui'
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                padding: '40px',
                borderRadius: '20px',
                border: '1px solid rgba(0,212,255,0.2)',
                width: '400px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}>
                <h1 style={{
                    background: 'linear-gradient(90deg, #00D4FF, #00E676)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                    fontSize: '32px',
                    marginBottom: '10px'
                }}>
                    AGS GERIATRICS
                </h1>
                <p style={{
                    color: '#00D4FF',
                    textAlign: 'center',
                    marginBottom: '30px',
                    fontSize: '14px',
                    letterSpacing: '2px'
                }}>
                    BOARD PREP 2024-2025
                </p>

                <div style={{
                    display: 'flex',
                    marginBottom: '30px',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <button
                        onClick={() => setMode('login')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: mode === 'login' ? '#00D4FF' : 'transparent',
                            color: mode === 'login' ? '#0A0E27' : '#fff',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        LOGIN
                    </button>
                    <button
                        onClick={() => setMode('register')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: mode === 'register' ? '#00D4FF' : 'transparent',
                            color: mode === 'register' ? '#0A0E27' : '#fff',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        REGISTER
                    </button>
                </div>

                {mode === 'register' && (
                    <>
                        <input
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '15px',
                                marginBottom: '15px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(0,212,255,0.3)',
                                borderRadius: '10px',
                                color: '#fff',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                        />
                        <input
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '15px',
                                marginBottom: '15px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(0,212,255,0.3)',
                                borderRadius: '10px',
                                color: '#fff',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                        />
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '15px',
                        marginBottom: '15px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(0,212,255,0.3)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '16px',
                        outline: 'none'
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '15px',
                        marginBottom: '25px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(0,212,255,0.3)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '16px',
                        outline: 'none'
                    }}
                />

                <button
                    onClick={handleSubmit}
                    style={{
                        width: '100%',
                        padding: '18px',
                        background: 'linear-gradient(135deg, #00D4FF, #00E676)',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#0A0E27',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        transition: 'transform 0.2s',
                        boxShadow: '0 10px 30px rgba(0,212,255,0.3)'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    {mode === 'login' ? 'Access System' : 'Create Account'}
                </button>

                <p style={{
                    textAlign: 'center',
                    marginTop: '30px',
                    color: 'rgba(0,212,255,0.5)',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}>
                    March 2025 • Israeli Context
                </p>
            </div>
        </div>
    );
}

export default Login;