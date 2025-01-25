import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AuthService } from '../../../services/auth';
import { login } from '../../../redux/slices/authSlice';

import { LoginContainer } from '../../../styles/public/Login/index';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitForm = async (e: { preventDefault: () => void; }) => {
        setLoading(true);
        e.preventDefault();
        try {
            const authenticated = await AuthService.login({
                email,
                password,
            });
            if (authenticated) {
                dispatch(login(authenticated));
            }else{
                console.error('Please check your login information.');
                // swalWithBootstrapButtons.fire(t('Oops.'), t('Please check your login information.'), 'error');
            }
            setLoading(false);
        } catch (error) {
            // swalWithBootstrapButtons.fire(t('Oops.'), t('Please check your login information.'), 'error');
            console.error('Login failed:', error);
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <h1>Login</h1>
            <form onSubmit={submitForm} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </LoginContainer>
    );
};

export default Login;