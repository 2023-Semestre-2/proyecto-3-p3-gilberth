import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../api/userApi'; 
import { AuthContext } from '../../services/AuthContext';

function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Utiliza useContext para acceder a la función login

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const credentials = { Email, Password };
            const response = await userLogin(credentials);
    
            if (response.msg === 'User logged in successfully') {
                // Accediendo a la información del usuario
                const userInfo = response.user;

                // Utiliza la función login del contexto para actualizar el estado global
                login(userInfo); 

                // Redirigir al usuario a otra página
                navigate('/');
            } else {
                // Manejar situaciones cuando la autenticación falla
                alert('Error en el inicio de sesión: ' + response.msg);
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    };
    
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>User Email:</label>
                    <input 
                        type="text" 
                        value={Email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        value={Password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;
