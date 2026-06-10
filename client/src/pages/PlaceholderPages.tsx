import React from 'react';
import { Clock, FileBarChart, Bell } from 'lucide-react';
import { EmptyState } from '../components/UI';
import { toast } from '../components/Toast';

export const Schedule = () => (
  <div className="glass-card">
    <EmptyState 
      icon={<Clock size={48} />}
      title="Gestione Turni"
      description="La funzionalità di pianificazione dei turni del personale sarà disponibile nel prossimo aggiornamento."
      action={<button onClick={() => toast.info('Notifica attivata per il rilascio')} className="btn-primary">Avvisami al rilascio</button>}
    />
  </div>
);

export const Reports = () => (
  <div className="glass-card">
    <EmptyState 
      icon={<FileBarChart size={48} />}
      title="Report Avanzati"
      description="I report dettagliati e l'esportazione in Excel/PDF richiedono la configurazione del backend."
      action={<button onClick={() => toast.info('Vedi il README per configurare il backend')} className="btn-secondary">Scopri come configurare</button>}
    />
  </div>
);

export const Notifications = () => (
  <div className="glass-card">
    <EmptyState 
      icon={<Bell size={48} />}
      title="Centro Notifiche"
      description="Non hai nuove notifiche al momento."
      action={<button onClick={() => toast.success('Preferenze aggiornate')} className="btn-secondary">Gestisci Preferenze</button>}
    />
  </div>
);