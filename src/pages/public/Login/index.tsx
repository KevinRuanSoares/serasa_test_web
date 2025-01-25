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
    const [activeTab, setActiveTab] = useState('login');

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
            } else {
                console.error('Please check your login information.');
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <div className="login-card">
                <div className="profile-icon">
                    <img src="assets/icon.png" alt="Profile" width={60} />
                </div>
                <h1>{activeTab === 'login' ? 'Login' : 'Sign Up'}</h1>
                <form onSubmit={submitForm} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Entrando em...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </LoginContainer>
    );
};

export default Login;
