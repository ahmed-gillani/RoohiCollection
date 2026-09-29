import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

type Mode = 'login' | 'register' | 'forgot';

interface AuthModalProps {
  open: boolean;
  initialMode: Mode;
  onClose: () => void;
}

export default function AuthModal({ open, initialMode, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    login(String(fd.get('email')), String(fd.get('password')));
    onClose();
    showToast('Logged in successfully');
    navigate('/account');
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    register(String(fd.get('name')), String(fd.get('email')), String(fd.get('password')));
    onClose();
    showToast('Account created!');
    navigate('/account');
  };

  const handleForgot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast('Reset link sent!');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      {mode === 'login' && (
        <>
          <h2>Welcome Back</h2>
          <p style={{ fontSize: 13, color: 'var(--sub)', marginBottom: 18 }}>Login to your RoohiCollections account</p>
          <form onSubmit={handleLogin}>
            <div className="form-field">
              <label>Email</label>
              <input required type="email" name="email" />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input required type="password" name="password" />
            </div>
            <Button block type="submit">Login</Button>
          </form>
          <div className="switch">
            <a onClick={() => setMode('forgot')}>Forgot password?</a>
          </div>
          <div className="switch">
            New here? <a onClick={() => setMode('register')}>Create an account</a>
          </div>
        </>
      )}
      {mode === 'register' && (
        <>
          <h2>Create Account</h2>
          <p style={{ fontSize: 13, color: 'var(--sub)', marginBottom: 18 }}>Join RoohiCollections today</p>
          <form onSubmit={handleRegister}>
            <div className="form-field">
              <label>Full Name</label>
              <input required name="name" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input required type="email" name="email" />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input required type="password" name="password" />
            </div>
            <Button block type="submit">Register</Button>
          </form>
          <div className="switch">
            Already have an account? <a onClick={() => setMode('login')}>Login</a>
          </div>
        </>
      )}
      {mode === 'forgot' && (
        <>
          <h2>Reset Password</h2>
          <p style={{ fontSize: 13, color: 'var(--sub)', marginBottom: 18 }}>
            Enter your email to receive reset instructions
          </p>
          <form onSubmit={handleForgot}>
            <div className="form-field">
              <label>Email</label>
              <input required type="email" />
            </div>
            <Button block type="submit">Send Reset Link</Button>
          </form>
          <div className="switch">
            <a onClick={() => setMode('login')}>Back to login</a>
          </div>
        </>
      )}
    </Modal>
  );
}
