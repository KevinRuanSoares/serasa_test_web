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
  VersionLabel,
} from './styles';
import { version } from '../../../../package.json';

import Modal from '../../../components/Modal';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const closeModal = () => setShowModal(false);

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
        setModalMessage('Por favor, verifique suas informações de login.');
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('Login falhou. Por favor, tente novamente.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <ProfileIcon>
          <img src="assets/icon.png" alt="ProfProfile" width={60} />
        </ProfileIcon>
        <Title>Login</Title>
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

      {showModal && (
        <Modal
          title="Ops!"
          message={modalMessage}
          onClose={closeModal}
        />
      )}

      <VersionLabel>Versão {version}</VersionLabel>
    </LoginContainer>
  );
};

export default Login;