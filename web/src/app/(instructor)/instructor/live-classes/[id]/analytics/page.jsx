"use client";

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Users, Clock, Video, Mic, TrendingUp, 
  CheckCircle, XCircle, Calendar, Monitor, Radio
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

// ─── Utility helpers ──────────────────────────────────────────────────────────
const fmtTime = (iso) => iso ? new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '—';
const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

function ProgressBar({ value, color = 'var(--color-primary)', label }) {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>{label}</span>
          <span style={{ fontSize: '12px', fontWeight: '800', color }}>{value}%</span>
        </div>
      )}
      <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.max(0, Math.min(100, value))}%`, background: color, borderRadius: '999px', transition: 'width 0.8s ease' }} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color = 'var(--color-primary)', wide = false }) {
  return (
    <div className="card" style={{ padding: '20px 24px', borderTop: `3px solid ${color}`, gridColumn: wide ? 'span 2' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ padding: '10px', borderRadius: '12px', background: `${color}18`, flexShrink: 0 }}>
          <Icon size={22} color={color} />
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.06em', marginBottom: '6px' }}>{label}</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--color-text-primary)', lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

function DeviceTimeline({ events, totalSecs }) {
  if (!events || events.length === 0) return <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>No events recorded</span>;
  const startTs = events[0]?.timestamp ? new Date(events[0].timestamp).getTime() : null;
  if (!startTs || !totalSecs) return null;
  const totalMs = totalSecs * 1000;

  const segments = [];
  let camOn = null, micOn = null;
  events.forEach(ev => {
    const t = new Date(ev.timestamp).getTime();
    const pct = Math.min(100, ((t - startTs) / totalMs) * 100);
    if (ev.type === 'camera_on') camOn = pct;
    if (ev.type === 'camera_off' && camOn !== null) { segments.push({ type: 'camera', start: camOn, width: pct - camOn }); camOn = null; }
    if (ev.type === 'mic_on') micOn = pct;
    if (ev.type === 'mic_off' && micOn !== null) { segments.push({ type: 'mic', start: micOn, width: pct - micOn }); micOn = null; }
  });
  if (camOn !== null) segments.push({ type: 'camera', start: camOn, width: 100 - camOn });
  if (micOn !== null) segments.push({ type: 'mic', start: micOn, width: 100 - micOn });

  return (
    <div style={{ marginTop: '6px' }}>
      {['camera', 'mic'].map(track => (
        <div key={track} style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-text-muted)', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            {track === 'camera' ? <Video size={10} /> : <Mic size={10} />}
            {track === 'camera' ? 'Camera' : 'Mic'}
          </div>
          <div style={{ position: 'relative', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
            {segments.filter(s => s.type === track).map((seg, i) => (
              <div key={i} style={{ position: 'absolute', left: `${seg.start}%`, width: `${seg.width}%`, height: '100%', background: track === 'camera' ? '#6366f1' : '#10b981', borderRadius: '2px', opacity: 0.85 }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LiveClassAnalyticsPage() {
  const { user } = useAuthStore();
  const params = useParams();
  const router = useRouter();
  const classId = params?.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedStudent, setExpandedStudent] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    if (!classId) return;
    setLoading(true);
    try {
      const { data: res } = await axios.get(`/api/instructor/live-classes/${classId}/analytics`);
      setData(res.data);
    } catch (err) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => { if (user) fetchAnalytics(); }, [user, fetchAnalytics]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '120px' }}><div className="spinner" /></div>;
  if (!data) return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--color-text-muted)' }}>Analytics not available.</div>;

  const { liveClass, summary, students } = data;

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ paddingBottom: '80px' }}>

      {/* Back + Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '32px' }}>
        <button onClick={() => router.back()} style={{ padding: '10px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px' }}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="page-title" style={{ fontSize: '22px', marginBottom: '4px' }}>{liveClass.title} — Analytics</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span><Calendar size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{fmtDate(liveClass.scheduledAt)}</span>
            <span><Clock size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{fmtTime(liveClass.scheduledAt)}</span>
            <span><Monitor size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{liveClass.subject}</span>
            <span><Users size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{liveClass.batches?.map(b => b.name).join(', ') || '—'}</span>
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon={Users}     label="Total Enrolled"  value={summary.totalEnrolled}               color="var(--color-primary)" />
        <StatCard icon={CheckCircle} label="Attended"       value={summary.attendedCount}               color="#10b981" sub={`${summary.attendanceRate}% attendance`} />
        <StatCard icon={XCircle}   label="Absent"           value={summary.absentCount}                 color="#ef4444" />
        <StatCard icon={Clock}     label="Avg. Duration"    value={summary.avgDurationFormatted}         color="#f59e0b" />
        <StatCard icon={Video}     label="Avg. Camera On"   value={`${summary.avgCameraEngagementPercent}%`} color="#6366f1" />
        <StatCard icon={Mic}       label="Avg. Mic On"      value={`${summary.avgMicEngagementPercent}%`}   color="#06b6d4" />
      </div>

      {/* Summary Engagement Bars */}
      <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '20px' }}>Class Engagement Overview</h3>
        <div style={{ display: 'grid', gap: '18px' }}>
          <ProgressBar value={summary.attendanceRate} color="#10b981" label={`Attendance Rate — ${summary.attendedCount} / ${summary.totalEnrolled} students`} />
          <ProgressBar value={summary.avgCameraEngagementPercent} color="#6366f1" label={`Average Camera-On Duration`} />
          <ProgressBar value={summary.avgMicEngagementPercent} color="#06b6d4" label={`Average Microphone-On Duration`} />
        </div>
      </div>

      {/* Students Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>Per-Student Breakdown</h3>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '13px', width: '220px', outline: 'none' }} />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Student', 'Status', 'Join Time', 'Leave Time', 'Duration', 'Camera', 'Mic', 'Details'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '800', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-muted)' }}>No students found</td></tr>
              ) : filtered.map(s => (
                <>
                  <tr key={s.studentId} style={{ borderTop: '1px solid var(--color-border)', background: expandedStudent === s.studentId ? '#f8fafc' : 'white' }}>
                    {/* Student */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {s.profilePhoto
                          ? <img src={s.profilePhoto} style={{ width: '36px', height: '36px', borderRadius: '10px', objectFit: 'cover' }} />
                          : <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: s.attended ? 'var(--color-primary)' : '#e2e8f0', color: s.attended ? 'white' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{s.name.charAt(0)}</div>
                        }
                        <div>
                          <div style={{ fontWeight: '700' }}>{s.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{s.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', background: s.attended ? '#dcfce7' : '#fee2e2', color: s.attended ? '#116030' : '#991b1b' }}>
                        {s.attended ? '✓ Present' : '✗ Absent'}
                      </span>
                    </td>

                    {/* Join */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontWeight: '600' }}>{fmtTime(s.joinTime)}</span>
                    </td>

                    {/* Leave */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontWeight: '600' }}>{fmtTime(s.leaveTime)}</span>
                    </td>

                    {/* Duration */}
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: '700', color: s.totalDurationSeconds > 0 ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{s.totalDurationFormatted}</span>
                    </td>

                    {/* Camera */}
                    <td style={{ padding: '14px 16px', minWidth: '130px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Video size={13} color="#6366f1" />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: '700' }}>{s.cameraOnDurationFormatted}</div>
                          <div style={{ height: '5px', background: '#e0e7ff', borderRadius: '3px', marginTop: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.cameraEngagementPercent}%`, background: '#6366f1', borderRadius: '3px' }} />
                          </div>
                          <div style={{ fontSize: '10px', color: '#6366f1', fontWeight: '700' }}>{s.cameraEngagementPercent}%</div>
                        </div>
                      </div>
                    </td>

                    {/* Mic */}
                    <td style={{ padding: '14px 16px', minWidth: '130px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Mic size={13} color="#06b6d4" />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: '700' }}>{s.micOnDurationFormatted}</div>
                          <div style={{ height: '5px', background: '#cffafe', borderRadius: '3px', marginTop: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.micEngagementPercent}%`, background: '#06b6d4', borderRadius: '3px' }} />
                          </div>
                          <div style={{ fontSize: '10px', color: '#06b6d4', fontWeight: '700' }}>{s.micEngagementPercent}%</div>
                        </div>
                      </div>
                    </td>

                    {/* Details Toggle */}
                    <td style={{ padding: '14px 16px' }}>
                      {s.deviceTimeline?.length > 0 ? (
                        <button onClick={() => setExpandedStudent(expandedStudent === s.studentId ? null : s.studentId)} style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>
                          {expandedStudent === s.studentId ? 'Hide' : 'Timeline'}
                        </button>
                      ) : <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>No data</span>}
                    </td>
                  </tr>

                  {/* Expanded Timeline Row */}
                  {expandedStudent === s.studentId && (
                    <tr key={`${s.studentId}-detail`} style={{ background: '#f8fafc', borderTop: '1px solid #e0e7ff' }}>
                      <td colSpan={8} style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '700px' }}>
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-text-secondary)', marginBottom: '10px', textTransform: 'uppercase' }}>Device Activity Timeline</div>
                            <DeviceTimeline events={s.deviceTimeline} totalSecs={s.totalDurationSeconds} />
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-text-secondary)', marginBottom: '10px', textTransform: 'uppercase' }}>Event Log</div>
                            <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {s.deviceTimeline.map((ev, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                                  {ev.type.startsWith('camera') ? <Video size={12} color="#6366f1" /> : <Mic size={12} color="#06b6d4" />}
                                  <span style={{ fontWeight: '700', color: ev.type.endsWith('_on') ? '#16a34a' : '#dc2626', textTransform: 'capitalize' }}>{ev.type.replace('_', ' ')}</span>
                                  <span style={{ color: 'var(--color-text-muted)' }}>{fmtTime(ev.timestamp)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
