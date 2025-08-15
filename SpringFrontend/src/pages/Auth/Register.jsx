import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

function Register() {
	const [form, setForm] = useState({
		email: '',
		username: '',
		password: '',
		profilePic: null,
		profilePicUrl: '',
		errors: {},
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const backendurl = "http://localhost:8080";

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'profilePic') {
			const file = files[0];
			setForm((f) => ({ ...f, profilePic: file }));
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => setForm((f) => ({ ...f, profilePicUrl: e.target.result }));
				reader.readAsDataURL(file);
			} else {
				setForm(f => ({ ...f, profilePicUrl: '' }));
			}
		} else {
			setForm(f => ({ ...f, [name]: value }));
		}
	};

	const validate = () => {
		const errs = {};
		if (!form.email) errs.email = 'Email is required.';
		else if (!emailRegex.test(form.email)) errs.email = 'Enter a valid email.';
		if (!form.username) errs.username = 'Username is required.';
		if (!form.password) errs.password = 'Password is required.';
		else if (!passwordRegex.test(form.password)) errs.password = 'Password must be 8+ chars, include upper, lower, number, special.';
		return errs;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const errors = validate();
		if (Object.keys(errors).length > 0) {
			setLoading(false);
			return setForm((f) => ({ ...f, errors }));
		}
		setForm((f) => ({ ...f, errors: {} }));
		const formData = new FormData();
		formData.append('email', form.email);
		formData.append('username', form.username);
		formData.append('password', form.password);
		if (form.profilePic) {
			formData.append('profilePic', form.profilePic);
		}
		try {
			const response = await axios.post(`${backendurl}/api/register`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			if (response.data) {
				console.log('Registration successful:', response);
				navigate('/login');
			} else {
				setForm((f) => ({ ...f, errors: { server: response.data.message } }));
			}
		} catch (error) {
			console.error('Registration error:', error);
			setForm((f) => ({ ...f, errors: { server: 'Registration failed. Please try again.' } }));
		} finally {
			setLoading(false);
		}
	}

	const { errors } = form;
	return (
		<div className="register-container">
			<form className="register-card register-form" onSubmit={handleSubmit} autoComplete="off">
				<div className="register-header">
					<h2>Register</h2>
					<p>Create your account</p>
				</div>
				{errors.server && (
					<div className="error-message" style={{ marginBottom: 12 }}>{errors.server}</div>
				)}
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						className={errors.email ? 'error' : ''}
						autoComplete="off"
						required
					/>
					{errors.email && <div className="error-message">{errors.email}</div>}
				</div>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						value={form.username}
						onChange={handleChange}
						className={errors.username ? 'error' : ''}
						autoComplete="off"
						required
					/>
					{errors.username && <div className="error-message">{errors.username}</div>}
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						className={errors.password ? 'error' : ''}
						autoComplete="off"
						required
					/>
					{errors.password && <div className="error-message">{errors.password}</div>}
					{!errors.password && (
						<div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
							Use 8+ chars, upper, lower, number, special.
						</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="profilePic">Profile Picture</label>
					<div className="file-input-wrapper">
						<input
							type="file"
							id="profilePic"
							name="profilePic"
							accept="image/*"
							onChange={handleChange}
							style={{ display: 'none' }}
						/>
						<label htmlFor="profilePic" className="file-input-label">
							{form.profilePicUrl ? (
								<img src={form.profilePicUrl} alt="Preview" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', marginRight: 8, verticalAlign: 'middle' }} />
							) : 'Choose a profile picture'}
						</label>
					</div>
				</div>
				<button className="register-button" type="submit" disabled={loading}>
					{loading ? 'Registering...' : 'Register'}
				</button>
				<div className="register-footer">
					<p>Already have an account? <a href="/login">Login</a></p>
				</div>
			</form>
		</div>
	);
}

export default Register;