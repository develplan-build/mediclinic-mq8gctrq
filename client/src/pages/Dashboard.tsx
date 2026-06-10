import React from 'react';
import { Users, Calendar, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { KPICard } from '../components/UI';

const chartData = [
  { name: 'Lun', visite: 12, ricavi: 1200 },
  { name: 'Mar', visite: 19, ricavi: 1900 },
  { name: 'Mer', visite: 15, ricavi: 1500 },
  { name: 'Gio', visite: 22, ricavi: 2200 },
  { name: 'Ven', visite: 28, ricavi: 2800 },
  { name: 'Sab', visite: 10, ricavi: 1000 },
  { name: 'Dom', visite: 5, ricavi: 500 },
];

export const Dashboard = () => {
  const { state } = useAppContext();

  const totalPatients = state.patients.length;
  const todayAppointments = state.appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length;
  const totalRevenue = state.invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div>
      <div className="kpi-grid">
        <KPICard title="Pazienti Totali" value={totalPatients} trend={5.2} icon={<Users size={24} />} />
        <KPICard title="Visite Oggi" value={todayAppointments} trend={-2.1} icon={<Calendar size={24} />} />
        <KPICard title="Ricavi Mensili" value={`€${totalRevenue}`} trend={12.5} icon={<DollarSign size={24} />} />
        <KPICard title="Tasso Occupazione" value="85%" trend={3.4} icon={<Activity size={24} />} />
      </div>

      <div className="dashboard-grid">
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Andamento Visite e Ricavi (Ultimi 7 giorni)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisite" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="visite" stroke="var(--accent)" fillOpacity={1} fill="url(#colorVisite)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Prossimi Appuntamenti</h3>
          {state.appointments.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0' }}>
              Nessun appuntamento in programma.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {state.appointments.slice(0, 5).map(app => (
                <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{app.patientName}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{app.doctor}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 500 }}>{app.time}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{app.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};