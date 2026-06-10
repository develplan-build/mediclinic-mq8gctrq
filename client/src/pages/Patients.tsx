import React, { useState } from 'react';
import { Plus, Search, Users, Edit, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Modal, EmptyState, Badge } from '../components/UI';
import { toast } from '../components/Toast';

export const Patients = () => {
  const { state, addPatient } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'active' });

  const filteredPatients = state.patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Compila i campi obbligatori (Nome e Email)');
      return;
    }
    addPatient({ ...formData, lastVisit: new Date().toISOString().split('T')[0] });
    toast.success('Paziente aggiunto con successo');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', status: 'active' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Cerca paziente..." 
            className="input-field" 
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={18} /> Nuovo Paziente
        </button>
      </div>

      <div className="glass-card table-container">
        {filteredPatients.length === 0 ? (
          <EmptyState 
            icon={<Users size={48} />}
            title="Nessun paziente trovato"
            description={searchTerm ? "Nessun risultato per la tua ricerca." : "Inizia aggiungendo il tuo primo paziente al sistema."}
            action={!searchTerm && <button onClick={() => setIsModalOpen(true)} className="btn-primary">Aggiungi Paziente</button>}
          />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome Paziente</th>
                <th>Contatti</th>
                <th>Ultima Visita</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td style={{ fontWeight: 500 }}>{patient.name}</td>
                  <td>
                    <div style={{ fontSize: '0.875rem' }}>{patient.email}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{patient.phone}</div>
                  </td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <Badge variant={patient.status === 'active' ? 'success' : 'neutral'}>
                      {patient.status === 'active' ? 'Attivo' : 'Inattivo'}
                    </Badge>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="icon-btn" style={{ width: '32px', height: '32px' }} onClick={() => toast.info('Funzione di modifica in arrivo')}><Edit size={16} /></button>
                      <button className="icon-btn" style={{ width: '32px', height: '32px', color: 'var(--danger)' }} onClick={() => toast.error('Eliminazione disabilitata in demo')}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Aggiungi Nuovo Paziente">
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">Nome Completo *</label>
            <input type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input type="email" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Telefono</label>
            <input type="tel" className="input-field" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="modal-footer" style={{ padding: '1.5rem 0 0 0', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Annulla</button>
            <button type="submit" className="btn-primary">Salva Paziente</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};