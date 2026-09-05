import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { useRiskSafeguard } from '../../context/RiskSafeguardContext';

export default function AlertHistoryTable() {
  const { alertLogs } = useRiskSafeguard();
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logs
  const filteredLogs = alertLogs.filter((log) => {
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesSearch = 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actionTaken.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.asset.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'ID,Timestamp,Severity,Title,Asset,Message,ActionTaken,Status,RiskScoreAtTrigger\n';
    const rows = filteredLogs.map(l => 
      `"${l.id}","${l.timestamp}","${l.severity}","${l.title.replace(/"/g, '""')}","${l.asset}","${l.message.replace(/"/g, '""')}","${l.actionTaken.replace(/"/g, '""')}","${l.status}","${l.riskScoreAtTrigger}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CapitalX_Risk_Audit_Trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSeverityBadge = (severity) => {
    if (severity === 'critical') {
      return (
        <span style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <ShieldAlert size={12} />
          CRITICAL
        </span>
      );
    }
    if (severity === 'warning') {
      return (
        <span style={{ background: '#FEF3C7', color: '#D97706', border: '1px solid #FCD34D', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <AlertTriangle size={12} />
          WARNING
        </span>
      );
    }
    return (
      <span style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        <CheckCircle2 size={12} />
        SAFE / OK
      </span>
    );
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 34, height: 34, borderRadius: '10px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <History size={18} color="#0F172A" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Alert History & Incident Audit Trail
            </h2>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
              Immutable chronological record of risk breaches, triggers, and automated actions taken
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', minWidth: '180px' }}>
            <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.45rem 0.75rem 0.45rem 2rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.8rem',
                outline: 'none',
                width: '100%',
              }}
            />
          </div>

          {/* Severity Filter Tabs */}
          <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', gap: '2px' }}>
            {['all', 'critical', 'warning', 'safe'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                style={{
                  background: filterSeverity === sev ? '#FFFFFF' : 'transparent',
                  border: 'none',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: filterSeverity === sev ? 800 : 600,
                  color: filterSeverity === sev ? '#0F172A' : '#64748B',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  boxShadow: filterSeverity === sev ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Export button */}
          <button
            onClick={handleExportCSV}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.85rem 1rem' }}>Timestamp</th>
              <th style={{ padding: '0.85rem 1rem' }}>Severity</th>
              <th style={{ padding: '0.85rem 1rem' }}>Incident / Breach Title</th>
              <th style={{ padding: '0.85rem 1rem' }}>Asset Affected</th>
              <th style={{ padding: '0.85rem 1rem' }}>Automated Safeguard Action Taken</th>
              <th style={{ padding: '0.85rem 1rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8' }}>
                  No incident logs match the active filter criteria.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log, index) => {
                const date = new Date(log.timestamp);
                const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

                return (
                  <tr
                    key={log.id || index}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: index % 2 === 0 ? '#FFFFFF' : '#FAFCFF',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{timeStr}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{dateStr}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {getSeverityBadge(log.severity)}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{log.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px', maxWidth: '300px' }}>{log.message}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#334155', whiteSpace: 'nowrap' }}>
                      {log.asset}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: '6px', fontSize: '0.76rem', color: '#0F172A', fontWeight: 600, borderLeft: '3px solid #10B981' }}>
                        {log.actionTaken}
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          background: log.status === 'auto-remediated' ? 'rgba(16, 185, 129, 0.1)' : '#F1F5F9',
                          color: log.status === 'auto-remediated' ? '#059669' : '#475569',
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
