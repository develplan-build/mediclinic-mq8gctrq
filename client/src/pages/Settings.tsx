import React from 'react';
import { Settings as SettingsIcon, Database, CreditCard, Shield, Bell } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { HAS_BACKEND } from '../config';
import { toast } from '../components/Toast';

export const Settings = () => {
  const { state, loadDemoData, clearData } = useAppContext();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Impostazioni salvate con successo');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
      <div className="glass-card" style={{ padding: '1rem', height: 'fit-content' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="nav-item active" style={{ width: '100%', justifyContent: 'flex-start' }}><SettingsIcon size={18} /> Generali</button>
          <button className="nav-item" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => toast.info('Sezione in sviluppo')}><Database size={18} /> Database</button>
          <button className="nav-item" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => toast.info('Sezione in sviluppo')}><CreditCard size={18} /> Pagamenti</button>
          <button className="nav-item" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => toast.info('Sezione in sviluppo')}><Shield size={18} /> Sicurezza</button>
          <button className="nav-item" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => toast.info('Sezione in sviluppo')}><Bell size={18} /> Notifiche</button>
        </nav>
      </div>

      <div className="glass-card">
        <h3 style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>Impostazioni Generali</h3>
        
        <form onSubmit={handleSave}>
          <div className="form-group" style={{ maxWidth: '400px' }}>
            <label className="form-label">Nome Clinica</label>
            <input type="text" className="input-field" defaultValue="MediClinic" />
          </div>
          <div className="form-group" style={{ maxWidth: '400px' }}>
            <label className="form-label">Email di Contatto</label>
            <input type="email" className="input-field" defaultValue="info@mediclinic.com" />
          </div>
          <div className="form-group" style={{ maxWidth: '400px' }}>
            <label className="form-label">Valuta Predefinita</label>
            <select className="input-field">
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>Gestione Dati (Demo)</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button type="button" onClick={loadDemoData} className="btn-secondary" disabled={state.isDemoMode}>
              Carica Dati di Esempio
            </button>
            <button type="button" onClick={clearData} className="btn-secondary" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} disabled={!state.isDemoMode && state.patients.length === 0}>
              Azzera Tutti i Dati
            </button>
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>Stato Integrazioni</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontWeight: 500 }}>Backend API</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Connessione al server Node.js</div>
              </div>
              <span className={`badge badge-${HAS_BACKEND ? 'success' : 'warning'}`}>{HAS_BACKEND ? 'Connesso' : 'Non Configurato'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontWeight: 500 }}>Supabase Database</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Archiviazione dati persistente</div>
              </div>
              <span className="badge badge-warning">Richiede Backend</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontWeight: 500 }}>Stripe Payments</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Elaborazione pagamenti fatture</div>
              </div>
              <span className="badge badge-warning">Richiede Backend</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="submit" className="btn-primary">Salva Modifiche</button>
          </div>
        </form>
      </div>
    </div>
  );
};