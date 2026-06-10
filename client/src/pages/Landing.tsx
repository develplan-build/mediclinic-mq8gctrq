import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, Clock, Users, FileText, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Landing = () => {
  const navigate = useNavigate();
  const { state, toggleTheme } = useAppContext();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav className="landing-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.5rem' }}>
          <Activity color="var(--accent)" size={32} />
          MediClinic
        </div>
        <div className="landing-links">
          <button onClick={() => scrollTo('features')} className="landing-link">Funzionalità</button>
          <button onClick={() => scrollTo('pricing')} className="landing-link">Prezzi</button>
          <button onClick={() => scrollTo('contact')} className="landing-link">Contatti</button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="icon-btn">{state.theme === 'dark' ? '☀️' : '🌙'}</button>
          <button onClick={() => navigate('/login')} className="btn-secondary">Accedi</button>
          <button onClick={() => navigate('/app')} className="btn-primary">Apri Dashboard</button>
        </div>
      </nav>

      <section className="hero-section">
        <h1 className="hero-title animate-slide-up">Il gestionale completo per la tua clinica medica</h1>
        <p className="hero-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Digitalizza l'intera operatività: pazienti, appuntamenti, cartelle cliniche, fatturazione e turni del personale in un'unica piattaforma sicura.
        </p>
        <div className="hero-actions animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button onClick={() => navigate('/app')} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Inizia Subito</button>
          <button onClick={() => scrollTo('features')} className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Scopri di più</button>
        </div>
      </section>

      <section id="features" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
        <h2 className="section-title">Tutto ciò di cui hai bisogno</h2>
        <p className="section-subtitle">Una suite completa di strumenti progettati specificamente per le esigenze delle strutture sanitarie moderne.</p>
        <div className="features-grid">
          {[ 
            { icon: <Users size={24} />, title: 'Gestione Pazienti', desc: 'Cartelle cliniche digitali, storico visite e anagrafica completa sempre a portata di mano.' },
            { icon: <Clock size={24} />, title: 'Agenda Intelligente', desc: 'Prenotazioni online, gestione turni medici e promemoria automatici via SMS/Email.' },
            { icon: <FileText size={24} />, title: 'Fatturazione Automatica', desc: 'Emissione fatture, integrazione con il sistema TS e gestione pagamenti semplificata.' },
            { icon: <Shield size={24} />, title: 'Sicurezza e Privacy', desc: 'Dati criptati, backup automatici e piena conformità al GDPR per la massima tranquillità.' }
          ].map((f, i) => (
            <div key={i} className="glass-card feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 style={{ marginBottom: '1rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="section-padding">
        <h2 className="section-title">Piani semplici e trasparenti</h2>
        <p className="section-subtitle">Scegli il piano più adatto alle dimensioni della tua struttura medica.</p>
        <div className="pricing-grid">
          <div className="glass-card pricing-card">
            <h3>Basic</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Per piccoli studi medici</p>
            <div className="price">15€<span>/mese</span></div>
            <ul className="pricing-features">
              <li><CheckCircle size={20} color="var(--success)" /> Fino a 3 medici</li>
              <li><CheckCircle size={20} color="var(--success)" /> Pazienti illimitati</li>
              <li><CheckCircle size={20} color="var(--success)" /> Agenda base</li>
              <li><CheckCircle size={20} color="var(--success)" /> Supporto email</li>
            </ul>
            <button onClick={() => navigate('/login')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Inizia con Basic</button>
          </div>
          <div className="glass-card pricing-card popular">
            <div className="popular-badge">PIÙ SCELTO</div>
            <h3>Pro</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Per cliniche strutturate</p>
            <div className="price">29€<span>/mese</span></div>
            <ul className="pricing-features">
              <li><CheckCircle size={20} color="var(--success)" /> Medici illimitati</li>
              <li><CheckCircle size={20} color="var(--success)" /> Fatturazione automatica</li>
              <li><CheckCircle size={20} color="var(--success)" /> Promemoria SMS/Email</li>
              <li><CheckCircle size={20} color="var(--success)" /> Gestione magazzino</li>
              <li><CheckCircle size={20} color="var(--success)" /> Supporto prioritario 24/7</li>
            </ul>
            <button onClick={() => navigate('/login')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Inizia con Pro</button>
          </div>
        </div>
      </section>

      <section id="contact" className="section-padding" style={{ background: 'var(--bg-surface)', textAlign: 'center' }}>
        <h2 className="section-title">Pronto a trasformare la tua clinica?</h2>
        <p className="section-subtitle">Unisciti a centinaia di medici che hanno già scelto MediClinic.</p>
        <button onClick={() => navigate('/app')} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Prova la Demo Gratuita</button>
      </section>
    </div>
  );
};