import React from 'react';
import { X } from 'lucide-react';

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h3>
          <button onClick={onClose} className="icon-btn" style={{ width: '32px', height: '32px' }}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Empty State Component
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="empty-state glass-card">
    <div className="empty-state-icon">{icon}</div>
    <h3>{title}</h3>
    <p style={{ marginBottom: '1.5rem' }}>{description}</p>
    {action}
  </div>
);

// Badge Component
interface BadgeProps {
  variant: 'success' | 'warning' | 'danger' | 'neutral';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children }) => (
  <span className={`badge badge-${variant}`}>{children}</span>
);

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon }) => (
  <div className="glass-card kpi-card">
    <div className="kpi-header">
      <span>{title}</span>
      <div style={{ color: 'var(--accent)' }}>{icon}</div>
    </div>
    <div className="kpi-value">{value}</div>
    {trend !== undefined && (
      <div className={`kpi-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% rispetto al mese scorso
      </div>
    )}
  </div>
);