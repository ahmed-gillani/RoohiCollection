import { useToast } from '@/context/ToastContext';

export default function Toast() {
  const { message } = useToast();
  return <div className={`toast ${message ? 'show' : ''}`}>{message}</div>;
}
