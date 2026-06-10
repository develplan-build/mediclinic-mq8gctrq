import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, Check, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Modal, EmptyState, Badge } from '../components/UI';
import { toast } from '../components/Toast';

export const Appointments = () => {
  const { state, addAppointment } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ patientName: '', date: '', time: '', doctor: '', status: 'pending' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.date || !formData.time) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    addAppointment(formData);
    toast.success('Appuntamento registrato con successo');
    setIsModalOpen(false);
    setFormData({ patientName: '', date: '', time: '', doctor: '', status: 'pending' });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed': return <Badge variant="success">Confermato</Badge>;
      case 'pending': return <Badge variant="warning">In attesa</Badge>;
      case 'cancelled': return <Badge variant="danger">Annullato</Badge>;
      default: return <Badge variant="neutral">Sconosciuto</Badge>;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="date" className="input-field" style={{ width: 'auto' }} defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={18} /> Nuovo Appuntamento
        </button>
      </div>

      <div className="glass-card table-container">
        {state.appointments.length === 0 ? (
          <EmptyState 
            icon={<CalendarIcon size={48} />}
            title="Nessun appuntamento"
            description="Non ci sono appuntamenti registrati per questa data."
            action={<button onClick={() => setIsModalOpen(true)} className="btn-primary">Prenota Ora</button>}
          />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Data e Ora</th>
                <th>Paziente</th>
                <th>Medico</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {state.appointments.map(app => (
                <tr key={app.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                      <CalendarIcon size={14} className="text-secondary" /> {app.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      <Clock size={14} /> {app.time}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{app.patientName}</td>
                  <td>{app.doctor}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="icon-btn" style={{ width: '32px', height: '32px', color: 'var(--success)' }} onClick={() => toast.success('Appuntamento confermato')} title="Conferma"><Check size={16} /></button>
                      <button className="icon-btn" style={{ width: '32px', height: '32px', color: 'var(--danger)' }} onClick={() => toast.error('Appuntamento annullato')} title="Annulla"><X size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nuova Prenotazione">
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">Nome Paziente *</label>
            <input type="text" className="input-field" value={formData.patientName} onChange={e => setFormData({...formData, patientName: e.target.value})} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Data *</label>
              <input type="date" className="input-field" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Ora *</label>
              <input type="time" className="input-field" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Medico Assegnato</label>
            <select className="input-field" value={formData.doctor} onChange={e => setFormData({...formData, doctor: e.target.value})}>
              <option value="">Seleziona medico...</option>
              <option value="Dr. Rossi">Dr. Rossi (Cardiologia)</option>
              <option value="Dr.ssa Bianchi">Dr.ssa Bianchi (Dermatologia)</option>
              <option value="Dr. Verdi">Dr. Verdi (Medicina Generale)</option>
            </select>
          </div>
          <div className="modal-footer" style={{ padding: '1.5rem 0 0 0', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Annulla</button>
            <button type="submit" className="btn-primary">Conferma Prenotazione</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};