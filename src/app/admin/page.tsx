"use client";

import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [leads, setLeads] = useState<any[]>([]);
  const [statusMsg, setStatusMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsAuthenticated(true);
      fetchData(password);
    }
  };

  const fetchData = async (authPass: string) => {
    try {
      // Fetch Settings
      const setRes = await fetch('/api/settings');
      if (setRes.ok) {
        const setData = await setRes.json();
        setSettings(setData);
      }

      // Fetch Leads
      const leadsRes = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${authPass}`
        }
      });
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData);
      } else {
        setIsAuthenticated(false);
        setStatusMsg("Invalid admin password");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setStatusMsg("Saving...");
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setStatusMsg("Settings saved successfully!");
        setTimeout(() => setStatusMsg(''), 3000);
      } else {
        setStatusMsg("Failed to save settings.");
      }
    } catch (error) {
      setStatusMsg("Error saving.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    try {
      const res = await fetch(`/api/leads?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
      if (res.ok) {
        setLeads(prev => prev.filter(lead => lead._id !== id));
      } else {
        alert("Failed to delete lead");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting lead");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loginBox}>
          <h1>Admin Portal</h1>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Admin Password" 
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button type="submit" className="glow-btn-primary" style={{width: '100%'}}>Login</button>
          </form>
          {statusMsg && <p style={{color: '#ff4444', marginTop: '10px'}}>{statusMsg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h2>Profit Ethics Admin</h2>
          <button className={styles.logoutBtn} onClick={() => { setIsAuthenticated(false); setPassword(''); }}>Logout</button>
        </header>

        <div className={styles.grid}>
          {/* Settings Column */}
          <div className={styles.card}>
            <h2>Course Settings</h2>
            
            <div className={styles.formGroup}>
              <label>Original Price (₹)</label>
              <input type="text" className={styles.inputField} value={settings.course_price || ''} onChange={(e) => handleSettingChange('course_price', e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label>Discounted Price (₹)</label>
              <input type="text" className={styles.inputField} value={settings.course_discounted_price || ''} onChange={(e) => handleSettingChange('course_discounted_price', e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label>Duration</label>
              <input type="text" className={styles.inputField} value={settings.course_duration || ''} onChange={(e) => handleSettingChange('course_duration', e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label>Classes</label>
              <input type="text" className={styles.inputField} value={settings.course_classes || ''} onChange={(e) => handleSettingChange('course_classes', e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label>Schedule</label>
              <input type="text" className={styles.inputField} value={settings.course_schedule || ''} onChange={(e) => handleSettingChange('course_schedule', e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label>Time</label>
              <input type="text" className={styles.inputField} value={settings.course_time || ''} onChange={(e) => handleSettingChange('course_time', e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label>Contact WhatsApp Number</label>
              <input type="text" className={styles.inputField} value={settings.whatsapp_number || ''} onChange={(e) => handleSettingChange('whatsapp_number', e.target.value)} />
            </div>

            <button className={`glow-btn ${styles.saveBtn}`} onClick={saveSettings}>Save Settings</button>
            {statusMsg && <p style={{color: 'var(--accent-green)', marginTop: '10px', textAlign: 'center'}}>{statusMsg}</p>}
          </div>

          {/* Leads Column */}
          <div className={styles.card}>
            <h2>Recent Leads ({leads.length})</h2>
            {leads.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead: any) => (
                    <tr key={lead._id}>
                      <td>{lead.name}</td>
                      <td>{lead.phone}</td>
                      <td>{lead.email}</td>
                      <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          onClick={() => handleDeleteLead(lead._id)}
                          style={{
                            background: '#ff4444', 
                            color: 'white', 
                            border: 'none', 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>No leads captured yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
