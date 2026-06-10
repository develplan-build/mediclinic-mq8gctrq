import React, { useState } from 'react';
import { Plus, FileText, Download, CreditCard } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Modal, EmptyState, Badge } from '../components/UI';
import { toast } from '../components/Toast';
import { HAS_BACKEND } from '../config';

export const Invoices = () => {
  const { state, addInvoice } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ patientName: '', amount: '', date: new Date().toISOString().split('T')[0], status: 'pending' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.amount) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    addInvoice({ ...formData, amount: parseFloat(formData.amount) });
    toast.success('Fattura emessa con successo');
    setIsModalOpen(false);
    setFormData({ patientName: '', amount: '', date: new Date().toISOString().split('T')[0], status: 'pending' });
  };

  const handleDownload = () => {
    if (!HAS_BACKEND) {
      toast.info('Il download del PDF richiede la configurazione del backend (vedi README)');
      return;
    }
    toast.success('Download PDF in corso...');
  };

  const handlePayment = () => {
    if (!HAS_BACKEND) {
      toast.info('L\'integrazione con Stripe richiede la configurazione del backend (vedi README)');
      return;
    }
    toast.success('Reindirizzamento al checkout Stripe...');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select className="input-field" style={{ width: 'auto' }}>
            <option value="all">Tutte le fatture</option>
            <option value="paid">Pagate</option>
            <option value="pending">In attesa</option>
          </select>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={18} /> Nuova Fattura
        </button>
      </div>

      <div className="glass-card table-container">
        {state.invoices.length === 0 ? (
          <EmptyState 
            icon={<FileText size={48} />}
            title="Nessuna fattura"
            description="Non ci sono fatture registrate nel sistema."
            action={<button onClick={() => setIsModalOpen(true)} className="btn-primary">Emetti Fattura</button>}
          />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Numero</th>
                <th>Data</th>
                <th>Paziente</th>
                <th>Importo</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {state.invoices.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 500, color: 'var(--accent)' }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td style={{ fontWeight: 500 }}>{inv.patientName}</td>
                  <td style={{ fontWeight: 600 }}>€{inv.amount.toFixed(2)}</td>
                  <td>
                    <Badge variant={inv.status === 'paid' ? 'success' : 'warning'}>
                      {inv.status === 'paid' ? 'Pagata' : 'In attesa'}
                    </Badge>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="icon-btn" style={{ width: '32px', height: '32px' }} onClick={handleDownload} title="Scarica PDF"><Download size={16} /></button>
                      {inv.status === 'pending' && (
                        <button className="icon-btn" style={{ width: '32px', height: '32px', color: 'var(--accent)' }} onClick={handlePayment} title="Paga con Stripe"><CreditCard size={16} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Emetti Nuova Fattura">
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">Paziente *</label>
            <input type="text" className="input-field" value={formData.patientName} onChange={e => setFormData({...formData, patientName: e.target.value})} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Importo (€) *</label>
              <input type="number" step="0.01" className="input-field" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Data Emissione *</label>
              <input type="date" className="input-field" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Stato Pagamento</label>
            <select className="input-field" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="pending">In attesa di pagamento</option>
              <option value="paid">Già pagata</option>
            </select>
          </div>
          <div className="modal-footer" style={{ padding: '1.5rem 0 0 0', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Annulla</button>
            <button type="submit" className="btn-primary">Emetti Fattura</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};