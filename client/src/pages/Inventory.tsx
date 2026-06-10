import React, { useState } from 'react';
import { Plus, Package, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Modal, EmptyState, Badge } from '../components/UI';
import { toast } from '../components/Toast';

export const Inventory = () => {
  const { state, addInventoryItem } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'Farmaci', quantity: '', minQuantity: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.minQuantity) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    const qty = parseInt(formData.quantity);
    const minQty = parseInt(formData.minQuantity);
    addInventoryItem({ 
      ...formData, 
      quantity: qty, 
      minQuantity: minQty,
      status: qty <= minQty ? 'low' : 'ok'
    });
    toast.success('Articolo aggiunto al magazzino');
    setIsModalOpen(false);
    setFormData({ name: '', category: 'Farmaci', quantity: '', minQuantity: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select className="input-field" style={{ width: 'auto' }}>
            <option value="all">Tutte le categorie</option>
            <option value="Farmaci">Farmaci</option>
            <option value="Materiale Medico">Materiale Medico</option>
            <option value="Cancelleria">Cancelleria</option>
          </select>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={18} /> Nuovo Articolo
        </button>
      </div>

      <div className="glass-card table-container">
        {state.inventory.length === 0 ? (
          <EmptyState 
            icon={<Package size={48} />}
            title="Magazzino vuoto"
            description="Non ci sono articoli registrati nel magazzino."
            action={<button onClick={() => setIsModalOpen(true)} className="btn-primary">Aggiungi Articolo</button>}
          />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Articolo</th>
                <th>Categoria</th>
                <th>Giacenza</th>
                <th>Scorta Minima</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {state.inventory.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 500 }}>{item.name}</td>
                  <td>{item.category}</td>
                  <td style={{ fontWeight: 600, color: item.quantity <= item.minQuantity ? 'var(--danger)' : 'inherit' }}>{item.quantity}</td>
                  <td>{item.minQuantity}</td>
                  <td>
                    {item.quantity <= item.minQuantity ? (
                      <Badge variant="danger"><AlertTriangle size={12} style={{ marginRight: '4px' }}/> In esaurimento</Badge>
                    ) : (
                      <Badge variant="success">Disponibile</Badge>
                    )}
                  </td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => toast.info('Funzione di riordino in arrivo')}>Riordina</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Aggiungi Articolo a Magazzino">
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">Nome Articolo *</label>
            <input type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Categoria</label>
            <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Farmaci">Farmaci</option>
              <option value="Materiale Medico">Materiale Medico</option>
              <option value="Cancelleria">Cancelleria</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Quantità Iniziale *</label>
              <input type="number" className="input-field" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Scorta Minima (Allarme) *</label>
              <input type="number" className="input-field" value={formData.minQuantity} onChange={e => setFormData({...formData, minQuantity: e.target.value})} required />
            </div>
          </div>
          <div className="modal-footer" style={{ padding: '1.5rem 0 0 0', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Annulla</button>
            <button type="submit" className="btn-primary">Salva Articolo</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};