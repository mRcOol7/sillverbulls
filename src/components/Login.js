import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        firstName: false,
        lastName: false,
        phoneNumber: false
    });
    const [errors, setErrors] = useState({});
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Password is required';
                } else if (value.length < 8) {
                    error = 'Password must be at least 8 characters';
                } else if (!/(?=.*[a-z])/.test(value)) {
                    error = 'Password must contain at least one lowercase letter';
                } else if (!/(?=.*[A-Z])/.test(value)) {
                    error = 'Password must contain at least one uppercase letter';
                } else if (!/(?=.*\d)/.test(value)) {
                    error = 'Password must contain at least one number';
                } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
                    error = 'Password must contain at least one special character (!@#$%^&*)';
                }
                break;
            case 'firstName':
                if (!value && !isLogin) {
                    error = 'First name is required';
                } else if (value && !/^[a-zA-Z]{2,}$/.test(value)) {
                    error = 'First name must be at least 2 characters and contain only letters';
                }
                break;
            case 'lastName':
                if (!value && !isLogin) {
                    error = 'Last name is required';
                } else if (value && !/^[a-zA-Z]{2,}$/.test(value)) {
                    error = 'Last name must be at least 2 characters and contain only letters';
                }
                break;
            case 'phoneNumber':
                if (!value && !isLogin) {
                    error = 'Phone number is required';
                } else if (value && !/^[6-9]\d{9}$/.test(value)) {
                    error = 'Please enter a valid 10-digit Indian phone number';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
        validateForm(true);
    };

    const validateForm = (isTouched = false) => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (!isLogin || (isLogin && ['email', 'password'].includes(key))) {
                if (isTouched && !touched[key]) return;
                const error = validateField(key, formData[key]);
                if (error) {
                    newErrors[key] = error;
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Mark all fields as touched
        setTouched({
            email: true,
            password: true,
            firstName: true,
            lastName: true,
            phoneNumber: true
        });
        
        if (validateForm()) {
            dispatch(loginStart());
            try {
                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                if (formData.email === 'test@test.com' && formData.password === 'Password123!') {
                    dispatch(loginSuccess({ 
                        email: formData.email,
                        firstName: formData.firstName,
                        lastName: formData.lastName 
                    }));
                    navigate('/home');
                } else {
                    dispatch(loginFailure('Invalid email or password'));
                }
            } catch (error) {
                dispatch(loginFailure('An error occurred. Please try again.'));
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: ''
        });
        setErrors({});
        setTouched({
            email: false,
            password: false,
            firstName: false,
            lastName: false,
            phoneNumber: false
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-image-section">
                <div className="image-content">
                    <h1>Trade Smarter with SilverBulls</h1>
                    <p>Experience the power of advanced algorithmic trading with our cutting-edge platform. Get real-time market insights and maximize your trading potential.</p>
                    
                </div>
            </div>
            
            <div className="auth-form-section">
                <div className="auth-box">
                    <h2>{isLogin ? 'Welcome Back' : 'Join Us'}</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={touched.email && errors.email ? 'error-input' : ''}
                            />
                            {touched.email && errors.email && 
                                <span className="error-text">{errors.email}</span>
                            }
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={touched.password && errors.password ? 'error-input' : ''}
                            />
                            {touched.password && errors.password && 
                                <span className="error-text">{errors.password}</span>
                            }
                        </div>

                        {!isLogin && (
                            <>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.firstName && errors.firstName ? 'error-input' : ''}
                                    />
                                    {touched.firstName && errors.firstName && 
                                        <span className="error-text">{errors.firstName}</span>
                                    }
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.lastName && errors.lastName ? 'error-input' : ''}
                                    />
                                    {touched.lastName && errors.lastName && 
                                        <span className="error-text">{errors.lastName}</span>
                                    }
                                </div>

                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.phoneNumber && errors.phoneNumber ? 'error-input' : ''}
                                    />
                                    {touched.phoneNumber && errors.phoneNumber && 
                                        <span className="error-text">{errors.phoneNumber}</span>
                                    }
                                </div>
                            </>
                        )}

                        <button type="submit" disabled={loading} className="auth-button">
                            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                        </button>
                    </form>

                    {isLogin && (
                        <div className="auth-links">
                            <button 
                                className="forgot-password-btn" 
                                onClick={() => navigate('/forgot-password')}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    <div className="auth-toggle">
                        <p>
                            {isLogin 
                                ? "Don't have an account? " 
                                : "Already have an account? "}
                            <button 
                                className="toggle-auth-btn" 
                                onClick={toggleMode}
                            >
                                {isLogin ? 'Create one' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;