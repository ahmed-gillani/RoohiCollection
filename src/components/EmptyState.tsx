import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  message?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="ic">{icon}</div>
      <h3>{title}</h3>
      {message && <p style={{ marginBottom: 20 }}>{message}</p>}
      {action}
    </div>
  );
}
