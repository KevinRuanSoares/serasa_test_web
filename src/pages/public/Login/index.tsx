// src/components/Login/index.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AuthService } from '../../../services/auth';
import { login } from '../../../redux/slices/authSlice';

import {
  LoginContainer,
  LoginCard,
  ProfileIcon,
  LoginForm,
  FormGroup,
  SubmitButton,
  Title,
} from '../../../styles/public/Login/index';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const submitForm = async (e: { preventDefault: () => void }) => {
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
      <LoginCard>
        <ProfileIcon>
          <img src="assets/icon.png" alt="Profile" width={60} />
        </ProfileIcon>
        <Title>{activeTab === 'login' ? 'Login' : 'Sign Up'}</Title>
        <LoginForm onSubmit={submitForm}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Entrando em...' : 'Entrar'}
          </SubmitButton>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;