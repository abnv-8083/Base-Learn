"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, RefreshCw, Trash2, Search, X, Filter, ChevronDown, UserCheck, Phone, Calendar, MessageSquare, Tag } from "lucide-react";
import { useConfirmStore } from "@/store/confirmStore";

const STATUSES = ["new", "contacted", "enrolled", "dropped"];

const STATUS_CONFIG = {
  new:       { color: '#6366f1', bg: '#eef2ff', label: 'New'       },
  contacted: { color: '#f59e0b', bg: '#fffbeb', label: 'Contacted' },
  enrolled:  { color: '#10b981', bg: '#ecfdf5', label: 'Enrolled'  },
  dropped:   { color: '#ef4444', bg: '#fef2f2', label: 'Dropped'   },
};

export default function AdminEnquiriesPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const confirm = useConfirmStore(s => s.confirm);

  // Search & filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [expandedRow, setExpandedRow] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/admin/enquiries");
      setRows(data.data || []);
    } catch {
      toast.error("Failed to load enquiries", { id: "enq-load" });
      setRows([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/admin/enquiries/${id}`, { status });
      toast.success("Status updated");
      load();
    } catch { toast.error("Could not update"); }
  };

  const deleteEnquiry = (id) => {
    confirm({
      title: "Delete Enquiry?",
      message: "This will permanently remove this admission enquiry. This action cannot be undone.",
      confirmText: "Delete Permanently",
      type: "danger",
      onConfirm: async () => {
        try {
          await axios.delete(`/api/admin/enquiries/${id}`);
          toast.success("Deleted");
          load();
        } catch { toast.error("Failed to delete"); }
      }
    });
  };

  // Derived — unique classes from data
  const classes = useMemo(() => {
    const all = rows.map(r => r.studentClass).filter(Boolean);
    return [...new Set(all)].sort();
  }, [rows]);

  // Filter pipeline
  const filtered = useMemo(() => rows.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.phone?.includes(q) || r.message?.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchClass  = classFilter === 'all' || r.studentClass === classFilter;
    return matchSearch && matchStatus && matchClass;
  }), [rows, search, statusFilter, classFilter]);

  const clearFilters = () => { setSearch(''); setStatusFilter('all'); setClassFilter('all'); };
  const hasFilters = search || statusFilter !== 'all' || classFilter !== 'all';

  // Summary counts
  const counts = useMemo(() => {
    const c = { all: rows.length };
    STATUSES.forEach(s => c[s] = rows.filter(r => r.status === s).length);
    return c;
  }, [rows]);

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <h1 className="page-title">Admission Enquiries</h1>
          <p className="page-subtitle">Manage incoming admissions from the landing page and registration form.</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={load} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={15} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} /> Refresh
        </button>
      </div>

      {/* ── Summary stat pills ── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[['all', 'All', '#64748b', '#f1f5f9'], ...STATUSES.map(s => [s, STATUS_CONFIG[s].label, STATUS_CONFIG[s].color, STATUS_CONFIG[s].bg])].map(([val, lbl, col, bg]) => (
          <button key={val} onClick={() => setStatusFilter(val === statusFilter ? 'all' : val)}
            style={{ padding: '8px 16px', borderRadius: '20px', border: `1.5px solid ${statusFilter === val ? col : '#e2e8f0'}`, background: statusFilter === val ? col : 'white', color: statusFilter === val ? 'white' : col, fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {lbl}
            <span style={{ background: statusFilter === val ? 'rgba(255,255,255,0.25)' : bg, color: statusFilter === val ? 'white' : col, padding: '1px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '800' }}>
              {counts[val] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* ── Search + filter bar ── */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '420px' }}>
          <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, or message…"
            style={{ width: '100%', padding: '11px 40px 11px 40px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', background: 'white' }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Class filter */}
        <div style={{ position: 'relative' }}>
          <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
            style={{ padding: '11px 36px 11px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontWeight: '500', color: '#1e293b', background: 'white', cursor: 'pointer', outline: 'none', appearance: 'none', minWidth: '150px' }}>
            <option value="all">All Classes</option>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
        </div>

        {hasFilters && (
          <button onClick={clearFilters} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', borderRadius: '12px', border: 'none', background: '#fef2f2', color: '#ef4444', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
            <X size={13} /> Clear Filters
          </button>
        )}

        <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
          Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong>
        </span>
      </div>

      {loading ? (
        <div className="spinner" style={{ display: 'block', margin: '10vh auto' }} />
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '2px dashed #e2e8f0' }}>
          <Mail size={40} style={{ margin: '0 auto 16px', opacity: 0.3, display: 'block' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>No Enquiries Found</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(r => {
            const st = STATUS_CONFIG[r.status] || STATUS_CONFIG.new;
            const isExpanded = expandedRow === r._id;
            return (
              <div key={r._id} style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s' }}>
                {/* Row header — always visible */}
                <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
                  onClick={() => setExpandedRow(isExpanded ? null : r._id)}>
                  {/* Avatar */}
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', color: '#64748b', flexShrink: 0 }}>
                    {r.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>{r.name}</span>
                      {r.studentClass && (
                        <span style={{ padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', background: '#f0f9ff', color: '#0284c7' }}>{r.studentClass}</span>
                      )}
                      <span style={{ padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', background: st.bg, color: st.color }}>{st.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={12} /> {r.email}
                      </span>
                      <span style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={12} /> {r.phone}
                      </span>
                      <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={11} /> {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Actions — always visible */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select value={r.status || 'new'} onChange={e => { e.stopPropagation(); updateStatus(r._id, e.target.value); }}
                      onClick={e => e.stopPropagation()}
                      style={{ padding: '7px 12px', borderRadius: '8px', border: `1.5px solid ${st.color}`, background: st.bg, color: st.color, fontSize: '12px', fontWeight: '700', cursor: 'pointer', outline: 'none' }}>
                      {STATUSES.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
                    </select>
                    <button onClick={e => { e.stopPropagation(); deleteEnquiry(r._id); }}
                      style={{ width: '34px', height: '34px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#b91c1c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Delete enquiry">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Expanded message */}
                {isExpanded && r.message && (
                  <div style={{ padding: '0 24px 18px 24px', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '14px', background: '#f8fafc', borderRadius: '10px', padding: '14px 16px' }}>
                      <MessageSquare size={15} style={{ color: '#64748b', marginTop: '2px', flexShrink: 0 }} />
                      <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: 0 }}>{r.message}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
