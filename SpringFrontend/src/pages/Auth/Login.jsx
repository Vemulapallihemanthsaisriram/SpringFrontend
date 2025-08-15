import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserProvider';
import axios from 'axios';
import { toast } from 'react-fox-toast';

function Login() {
    const [form, setForm] = useState({
        identifier: '', // username or email
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const baseurl = import.meta.env.VITE_APP_API;

    const { loginUser } = useContext(UserContext);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.identifier || !form.password) {
            setError('Please enter your username/email and password.');
            return;
        }
        setLoading(true);

        console.clear();
        console.log(form);

        await axios.post(baseurl + '/api/login-user', { identifier: form.identifier, password: form.password })
            .then((res) => {
                console.log(res.data);
                toast.success('Successful Login', {
                    icon: '👍',
                    position: 'top-center'
                })
                loginUser(res.data);
                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 3000);
            })
            .catch((err) => {
                if (err.status === 401) {
                    toast.error('You are an Unauthorized User To Login, Please Register', {
                        position: 'top-center'
                    })
                }
                console.error(err);
            })
            setLoading(false);
    };

    return (
        <div className="register-container">
            <form className="register-card register-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="register-header">
                    <h2>Login</h2>
                    <p>Sign in to your account</p>
                </div>
                <div className="form-group">
                    <label htmlFor="identifier">Username or Email</label>
                    <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        value={form.identifier}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button className="register-button" type="submit" disabled={loading}>
                    {loading ? <span style={{ scale: 1.5 }} className="loading loading-infinity loading-xl"></span> : 'Login'}
                </button>
                <div className="register-footer">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
    );
}

export default Login;