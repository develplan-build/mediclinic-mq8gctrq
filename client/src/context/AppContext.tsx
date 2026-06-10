import React, { createContext, useContext, useState, useEffect } from 'react';
import { HAS_BACKEND } from '../config';
import { toast } from '../components/Toast';

interface AppState {
  theme: 'dark' | 'light';
  isDemoMode: boolean;
  patients: any[];
  appointments: any[];
  invoices: any[];
  inventory: any[];
  staff: any[];
}

interface AppContextType {
  state: AppState;
  toggleTheme: () => void;
  loadDemoData: () => void;
  clearData: () => void;
  addPatient: (patient: any) => void;
  addAppointment: (appointment: any) => void;
  addInvoice: (invoice: any) => void;
  addInventoryItem: (item: any) => void;
  addStaff: (member: any) => void;
}

const initialState: AppState = {
  theme: 'dark',
  isDemoMode: false,
  patients: [],
  appointments: [],
  invoices: [],
  inventory: [],
  staff: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const loadDemoData = () => {
    setState(prev => ({
      ...prev,
      isDemoMode: true,
      patients: [
        { id: '1', name: 'Mario Rossi', email: 'mario@example.com', phone: '3331234567', status: 'active', lastVisit: '2023-10-15' },
        { id: '2', name: 'Giulia Bianchi', email: 'giulia@example.com', phone: '3339876543', status: 'active', lastVisit: '2023-10-20' },
      ],
      appointments: [
        { id: '1', patientName: 'Mario Rossi', date: '2023-11-05', time: '10:00', doctor: 'Dr. Verdi', status: 'confirmed' },
        { id: '2', patientName: 'Giulia Bianchi', date: '2023-11-06', time: '14:30', doctor: 'Dr. Neri', status: 'pending' },
      ],
      invoices: [
        { id: 'INV-001', patientName: 'Mario Rossi', amount: 150, date: '2023-10-15', status: 'paid' },
        { id: 'INV-002', patientName: 'Giulia Bianchi', amount: 200, date: '2023-10-20', status: 'pending' },
      ],
      inventory: [
        { id: '1', name: 'Paracetamolo 500mg', category: 'Farmaci', quantity: 150, minQuantity: 50, status: 'ok' },
        { id: '2', name: 'Siringhe 5ml', category: 'Materiale Medico', quantity: 20, minQuantity: 100, status: 'low' },
      ],
      staff: [
        { id: '1', name: 'Dr. Alessandro Verdi', role: 'Cardiologo', email: 'verdi@mediclinic.com', status: 'active' },
        { id: '2', name: 'Dr.ssa Elena Neri', role: 'Dermatologa', email: 'neri@mediclinic.com', status: 'active' },
      ]
    }));
    toast.success('Dati demo caricati con successo');
  };

  const clearData = () => {
    setState(prev => ({ ...initialState, theme: prev.theme }));
    toast.info('Dati azzerati. L\'app è ora vuota.');
  };

  const addPatient = (patient: any) => setState(prev => ({ ...prev, patients: [...prev.patients, { ...patient, id: Date.now().toString() }] }));
  const addAppointment = (app: any) => setState(prev => ({ ...prev, appointments: [...prev.appointments, { ...app, id: Date.now().toString() }] }));
  const addInvoice = (inv: any) => setState(prev => ({ ...prev, invoices: [...prev.invoices, { ...inv, id: `INV-${Date.now().toString().slice(-4)}` }] }));
  const addInventoryItem = (item: any) => setState(prev => ({ ...prev, inventory: [...prev.inventory, { ...item, id: Date.now().toString() }] }));
  const addStaff = (member: any) => setState(prev => ({ ...prev, staff: [...prev.staff, { ...member, id: Date.now().toString() }] }));

  return (
    <AppContext.Provider value={{ state, toggleTheme, loadDemoData, clearData, addPatient, addAppointment, addInvoice, addInventoryItem, addStaff }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};