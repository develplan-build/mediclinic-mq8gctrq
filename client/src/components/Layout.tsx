import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, FileText, 
  Clock, Package, FileBarChart, Bell, Settings, 
  LogOut, Activity, Sun, Moon, Database, X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { HAS_BACKEND } from '../config';
import { toast } from './Toast';

const Sidebar = () => {
  const navItems = [
    { path: '/app', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/app/patients', icon: <Users size={20} />, label: 'Pazienti & CRM' },
    { path: '/app/appointments', icon: <Calendar size={20} />, label: 'Prenotazioni' },
    { path: '/app/invoices', icon: <FileText size={20} />, label: 'Fatturazione' },
    { path: '/app/schedule', icon: <Clock size={20} />, label: 'Turni Personale' },
    { path: '/app/inventory', icon: <Package size={20} />, label: 'Magazzino' },
    { path: '/app/reports', icon: <FileBarChart size={20} />, label: 'Report & Export' },
    { path: '/app/notifications', icon: <Bell size={20} />, label: 'Notifiche' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Activity size={28} className="sidebar-logo-icon" />
        <span className="sidebar-title">MediClinic</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            end={item.path === '/app'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <NavLink to="/app/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Impostazioni</span>
        </NavLink>
      </div>
    </aside>
  );
};

const Header = () => {
  const { state, toggleTheme, loadDemoData, clearData } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/app') return 'Dashboard Analytics';
    if (path.includes('patients')) return 'Gestione Pazienti';
    if (path.includes('appointments')) return 'Agenda e Prenotazioni';
    if (path.includes('invoices')) return 'Fatturazione';
    if (path.includes('schedule')) return 'Turni Personale';
    if (path.includes('inventory')) return 'Magazzino Farmaci';
    if (path.includes('reports')) return 'Report e Statistiche';
    if (path.includes('notifications')) return 'Centro Notifiche';
    if (path.includes('settings')) return 'Impostazioni Sistema';
    return 'MediClinic';
  };

  const handleLogout = () => {
    toast.info('Logout effettuato');
    navigate('/');
  };

  return (
    <header className="top-header">
      <h1 className="header-title">{getPageTitle()}</h1>
      <div className="header-actions">
        <button onClick={state.isDemoMode ? clearData : loadDemoData} className="btn-secondary" style={{ fontSize: '0.875rem' }}>
          <Database size={16} />
          {state.isDemoMode ? 'Azzera Dati' : 'Carica Demo'}
        </button>
        <button onClick={toggleTheme} className="icon-btn" title="Cambia Tema">
          {state.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={() => navigate('/app/notifications')} className="icon-btn" title="Notifiche">
          <Bell size={20} />
        </button>
        <button onClick={handleLogout} className="icon-btn" title="Esci">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

const DemoBanner = () => {
  const [visible, setVisible] = useState(!HAS_BACKEND);
  if (!visible) return null;
  return (
    <div className="demo-banner">
      <div className="demo-banner-text">
        <Info size={16} />
        <span><strong>Modalità Demo:</strong> I dati sono salvati localmente. Scarica il codice e segui il README per collegare Supabase, Stripe e gli altri servizi reali.</span>
      </div>
      <button onClick={() => setVisible(false)} style={{ color: 'inherit' }}><X size={16} /></button>
    </div>
  );
};

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <DemoBanner />
        <Header />
        <div className="page-container animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};