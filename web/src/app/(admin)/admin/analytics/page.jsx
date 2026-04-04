"use client";

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Users, GraduationCap, Video, BookOpen, BarChart2, TrendingUp,
  TrendingDown, Minus, Camera, Mic, Clock, CheckCircle, XCircle,
  Calendar, Search, Download, Filter, Layers, FileText, Award
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts';
import toast from 'react-hot-toast';

// ─── Mini helpers ─────────────────────────────────────────────────────────────
const pct = (n, d) => d > 0 ? Math.round((n / d) * 100) : 0;

function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  const TIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const tColor = trend > 0 ? '#10b981' : trend < 0 ? '#ef4444' : '#94a3b8';
  return (
    <div className="card" style={{ padding: '20px 22px', borderTop: `3px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ padding: '10px', borderRadius: '12px', background: `${color}18` }}>
          <Icon size={22} color={color} />
        </div>
        {trend != null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', color: tColor }}>
            <TIcon size={14} /> {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '32px', fontWeight: '900', lineHeight: 1, color: 'var(--color-text-primary)' }}>{value}</div>
        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '6px' }}>{label}</div>
        {sub && <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{sub}</div>}
      </div>
    </div>
  );
}

function EngagementBar({ value, color, label }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: '700' }}>{label}</span>
        <span style={{ fontSize: '13px', fontWeight: '800', color }}>{value}%</span>
      </div>
      <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.max(0, Math.min(100, value))}%`, background: color, borderRadius: '999px', transition: 'width 1s ease' }} />
      </div>
    </div>
  );
}

function AttendanceDot({ rate }) {
  const color = rate >= 80 ? '#10b981' : rate >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontWeight: '700', color }}>{rate}%</span>
    </span>
  );
}

const SECTION_TABS = ['overview', 'students', 'sessions', 'content'];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminAnalyticsPage() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState('overview');
  const [search, setSearch]   = useState('');
  const [sortKey, setSortKey] = useState('attendanceRate');
  const [sortDir, setSortDir] = useState('desc');

  useEffect(() => {
    axios.get('/api/admin/analytics')
      .then(r => setData(r.data.data))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  const sortedStudents = useMemo(() => {
    if (!data) return [];
    const q = search.toLowerCase();
    const filtered = data.students.filter(s =>
      s.name.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q) ||
      s.batch?.toLowerCase().includes(q) || s.class?.toLowerCase().includes(q)
    );
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey] ?? 0;
      const bVal = b[sortKey] ?? 0;
      return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
  }, [data, search, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const downloadCSV = () => {
    if (!data) return;
    const rows = [
      ['Name', 'Email', 'Class', 'Batch', 'Sessions', 'Attended', 'Attendance %', 'Total Time', 'Camera %', 'Mic %', 'Paid', 'Active'],
      ...sortedStudents.map(s => [
        s.name, s.email, s.class, s.batch,
        s.totalSessions, s.attended, s.attendanceRate,
        s.totalDurationFormatted, s.avgCameraPercent, s.avgMicPercent,
        s.hasPaid ? 'Yes' : 'No', s.isActive ? 'Yes' : 'No'
      ])
    ];
    const csv  = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href = url; a.download = 'analytics.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '160px' }}><div className="spinner" /></div>;
  if (!data)   return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--color-text-muted)' }}>No analytics data available.</div>;

  const { overview: ov, content: ct, attendance: att, enrollmentTrend, sessions, students } = data;

  const pieData = [
    { name: 'Students',    value: ov.totalStudents,    color: '#6366f1' },
    { name: 'Faculty',     value: ov.totalFaculty,     color: '#10b981' },
    { name: 'Instructors', value: ov.totalInstructors, color: '#f59e0b' },
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>

      {/* ── Header ─────────────────────────────────── */}
      <div className="page-header" style={{ marginBottom: '28px' }}>
        <div>
          <h1 className="page-title">Platform Analytics</h1>
          <p className="page-subtitle">Comprehensive view of student engagement, attendance, and content performance.</p>
        </div>
        <button onClick={downloadCSV} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px' }}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* ── Tab Bar ───────────────────────────────── */}
      <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '14px', padding: '4px', marginBottom: '28px', width: 'fit-content', border: '1px solid #e2e8f0' }}>
        {SECTION_TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 24px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
            border: 'none', textTransform: 'capitalize',
            background: tab === t ? 'var(--color-primary)' : 'transparent',
            color: tab === t ? 'white' : '#64748b',
            transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════
          OVERVIEW TAB
      ════════════════════════════════════════════════ */}
      {tab === 'overview' && (
        <>
          {/* User Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '28px' }}>
            <StatCard icon={GraduationCap} label="Total Students"    value={ov.totalStudents}    color="#6366f1" trend={ov.growthPct} sub={`↑ ${ov.newStudentsThisMonth} this month`} />
            <StatCard icon={Users}         label="Faculty Members"   value={ov.totalFaculty}     color="#10b981" />
            <StatCard icon={Users}         label="Instructors"       value={ov.totalInstructors} color="#f59e0b" />
            <StatCard icon={CheckCircle}   label="Active Students"   value={ov.activeStudents}   color="#3b82f6" sub={`${pct(ov.activeStudents, ov.totalStudents)}% of total`} />
            <StatCard icon={Award}         label="Paid Students"     value={ov.paidStudents}     color="#8b5cf6" sub={`${pct(ov.paidStudents, ov.totalStudents)}% enrolled`} />
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '28px' }}>
            {/* Enrollment trend */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <TrendingUp size={18} color="var(--color-primary)" />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800' }}>Student Enrolment — Last 6 Months</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={enrollmentTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="enrolGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} style={{ fontSize: '11px' }} />
                  <YAxis axisLine={false} tickLine={false} allowDecimals={false} style={{ fontSize: '11px' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '13px' }} />
                  <Area type="monotone" dataKey="students" name="New Students" stroke="#6366f1" fill="url(#enrolGrad)" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* User type pie */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '800' }}>User Distribution</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                {pieData.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: p.color }} />
                      <span style={{ fontSize: '12px', fontWeight: '600' }}>{p.name}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: p.color }}>{p.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance + engagement overview */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '800' }}>Live Class Attendance</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <EngagementBar value={att.overallAttendanceRate}  color="#10b981" label="Overall Attendance Rate" />
                <EngagementBar value={att.avgCameraEngagement}    color="#6366f1" label="Avg. Camera-On Time" />
                <EngagementBar value={att.avgMicEngagement}       color="#06b6d4" label="Avg. Mic-On Time" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px' }}>
                {[
                  ['Sessions Tracked', att.totalSessionsTracked, '#10b981'],
                  ['Attendance Rate',  att.overallAttendanceRate + '%', '#6366f1'],
                ].map(([l, v, c]) => (
                  <div key={l} style={{ padding: '14px', background: `${c}10`, borderRadius: '12px', border: `1px solid ${c}30` }}>
                    <div style={{ fontSize: '20px', fontWeight: '900', color: c }}>{v}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: '600', marginTop: '4px' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '800' }}>Content Overview</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  ['Live Classes',    ct.totalLiveClasses,    ct.completedLiveClasses, '#ef4444'],
                  ['Recorded Videos', ct.totalRecorded,       ct.publishedRecorded,    '#6366f1'],
                  ['Assignments',     ct.totalAssignments,    null,                    '#f59e0b'],
                  ['Tests',           ct.totalTests,          null,                    '#3b82f6'],
                  ['Submissions',     ct.totalSubmissions,    null,                    '#10b981'],
                  ['Subjects',        ct.totalSubjects,       null,                    '#8b5cf6'],
                  ['Chapters',        ct.totalChapters,       null,                    '#06b6d4'],
                  ['Batches',         ct.totalBatches,        null,                    '#64748b'],
                ].map(([label, total, done, color]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: color }} />
                      <span style={{ fontSize: '13px', fontWeight: '600' }}>{label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '800', color }}>{total}</span>
                      {done != null && <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>({done} done)</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ════════════════════════════════════════════════
          STUDENTS TAB
      ════════════════════════════════════════════════ */}
      {tab === 'students' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>All Students — Attendance & Engagement ({sortedStudents.length})</h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student, batch, class…"
                  style={{ padding: '9px 12px 9px 34px', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '13px', width: '260px', outline: 'none' }} />
              </div>
              <button onClick={downloadCSV} className="btn btn-secondary" style={{ padding: '9px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <Download size={14} /> CSV
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {[
                    ['Student',         null],
                    ['Class / Batch',   null],
                    ['Sessions',        'totalSessions'],
                    ['Attended',        'attended'],
                    ['Attendance %',    'attendanceRate'],
                    ['Total Time',      null],
                    ['Camera',          'avgCameraPercent'],
                    ['Mic',             'avgMicPercent'],
                    ['Paid',            'hasPaid'],
                  ].map(([h, k]) => (
                    <th key={h}
                      onClick={() => k && toggleSort(k)}
                      style={{ padding: '12px 14px', textAlign: 'left', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap', cursor: k ? 'pointer' : 'default', userSelect: 'none' }}>
                      {h} {k && sortKey === k ? (sortDir === 'asc' ? '↑' : '↓') : k ? '' : ''}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedStudents.length === 0 ? (
                  <tr><td colSpan={9} style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>No students found</td></tr>
                ) : sortedStudents.map(s => (
                  <tr key={s._id} style={{ borderTop: '1px solid var(--color-border)' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {s.profilePhoto
                          ? <img src={s.profilePhoto} style={{ width: '34px', height: '34px', borderRadius: '10px', objectFit: 'cover' }} alt="" />
                          : <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: s.isActive ? '#6366f1' : '#e2e8f0', color: s.isActive ? 'white' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>{s.name.charAt(0)}</div>
                        }
                        <div>
                          <div style={{ fontWeight: '700' }}>{s.name}</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: '600', fontSize: '12px' }}>{s.class}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.batch}</div>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '700' }}>{s.totalSessions}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '700' }}>{s.attended}</td>
                    <td style={{ padding: '12px 14px' }}><AttendanceDot rate={s.attendanceRate} /></td>
                    <td style={{ padding: '12px 14px', fontWeight: '600', whiteSpace: 'nowrap', color: '#475569' }}>{s.totalDurationFormatted}</td>
                    <td style={{ padding: '12px 14px', minWidth: '110px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <Camera size={12} color="#6366f1" />
                        <div style={{ flex: 1 }}>
                          <div style={{ height: '5px', background: '#e0e7ff', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.avgCameraPercent}%`, background: '#6366f1', borderRadius: '999px' }} />
                          </div>
                          <span style={{ fontSize: '10px', fontWeight: '700', color: '#6366f1' }}>{s.avgCameraPercent}%</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', minWidth: '110px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <Mic size={12} color="#06b6d4" />
                        <div style={{ flex: 1 }}>
                          <div style={{ height: '5px', background: '#cffafe', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.avgMicPercent}%`, background: '#06b6d4', borderRadius: '999px' }} />
                          </div>
                          <span style={{ fontSize: '10px', fontWeight: '700', color: '#06b6d4' }}>{s.avgMicPercent}%</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '800', background: s.hasPaid ? '#dcfce7' : '#fef3c7', color: s.hasPaid ? '#166534' : '#92400e' }}>
                        {s.hasPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════
          SESSIONS TAB
      ════════════════════════════════════════════════ */}
      {tab === 'sessions' && (
        <>
          {/* Attendance bar chart */}
          {sessions.length > 0 && (
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '800' }}>Session Attendance Rates</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={sessions.slice(0, 12).map(s => ({ name: s.title.slice(0, 20) + (s.title.length > 20 ? '…' : ''), rate: s.attendanceRate }))} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px' }} angle={-30} textAnchor="end" interval={0} />
                  <YAxis axisLine={false} tickLine={false} style={{ fontSize: '11px' }} unit="%" domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '12px' }} formatter={v => [v + '%', 'Attendance']} />
                  <Bar dataKey="rate" name="Attendance %" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {sessions.slice(0, 12).map((s, i) => (
                      <Cell key={i} fill={s.attendanceRate >= 80 ? '#10b981' : s.attendanceRate >= 50 ? '#f59e0b' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800' }}>All Live Sessions ({sessions.length})</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['Session', 'Faculty', 'Batches', 'Date', 'Enrolled', 'Attended', 'Attend %', 'Camera', 'Mic'].map(h => (
                      <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.length === 0 ? (
                    <tr><td colSpan={9} style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>No completed sessions yet</td></tr>
                  ) : sessions.map(s => (
                    <tr key={s._id} style={{ borderTop: '1px solid var(--color-border)' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: '700' }}>{s.title}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.subject}</div>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: '600' }}>{s.faculty}</td>
                      <td style={{ padding: '12px 14px', fontSize: '11px', color: '#64748b' }}>{s.batches}</td>
                      <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: '#64748b', fontSize: '12px' }}>{s.scheduledAt ? new Date(s.scheduledAt).toLocaleDateString() : '—'}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '700' }}>{s.enrolled}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '700' }}>{s.attended}</td>
                      <td style={{ padding: '12px 14px' }}><AttendanceDot rate={s.attendanceRate} /></td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '50px', height: '6px', background: '#e0e7ff', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.avgCamera}%`, background: '#6366f1', borderRadius: '999px' }} />
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1' }}>{s.avgCamera}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '50px', height: '6px', background: '#cffafe', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.avgMic}%`, background: '#06b6d4', borderRadius: '999px' }} />
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#06b6d4' }}>{s.avgMic}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ════════════════════════════════════════════════
          CONTENT TAB
      ════════════════════════════════════════════════ */}
      {tab === 'content' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Live Classes',      total: ct.totalLiveClasses,   done: ct.completedLiveClasses, icon: Video,    color: '#ef4444', doneLabel: 'Completed' },
            { label: 'Recorded Videos',   total: ct.totalRecorded,      done: ct.publishedRecorded,    icon: Video,    color: '#6366f1', doneLabel: 'Published' },
            { label: 'Subjects',          total: ct.totalSubjects,      done: null,                    icon: BookOpen, color: '#8b5cf6' },
            { label: 'Chapters',          total: ct.totalChapters,      done: null,                    icon: FileText, color: '#06b6d4' },
            { label: 'Batches',           total: ct.totalBatches,       done: null,                    icon: Layers,   color: '#64748b' },
            { label: 'Assignments',       total: ct.totalAssignments,   done: null,                    icon: FileText, color: '#f59e0b' },
            { label: 'Tests',             total: ct.totalTests,         done: null,                    icon: Award,    color: '#3b82f6' },
            { label: 'Submissions',       total: ct.totalSubmissions,   done: null,                    icon: CheckCircle, color: '#10b981' },
          ].map(c => (
            <div key={c.label} className="card" style={{ padding: '24px', borderLeft: `4px solid ${c.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</span>
                <div style={{ padding: '8px', borderRadius: '10px', background: `${c.color}18` }}>
                  <c.icon size={18} color={c.color} />
                </div>
              </div>
              <div style={{ fontSize: '40px', fontWeight: '900', color: c.color, lineHeight: 1 }}>{c.total}</div>
              {c.done != null && (
                <div style={{ marginTop: '12px' }}>
                  <EngagementBar value={pct(c.done, c.total)} color={c.color} label={`${c.done} ${c.doneLabel}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
