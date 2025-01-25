import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AuthService } from '../../../services/auth';
import { login } from '../../../redux/slices/authSlice';

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
        <div>
            <h1>Login</h1>
        </div>
    );
};

export default Login;
