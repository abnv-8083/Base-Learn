import { useState } from 'react';
import { ChevronLeft, ChevronRight, Video, FileText } from 'lucide-react';

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock events
  const events = [
    { date: new Date(Date.now() + 86400000), title: 'React JS Live', type: 'class', time: '10:00 AM' },
    { date: new Date(Date.now() + 86400000 * 3), title: 'Physics Essay Due', type: 'assignment', time: '11:59 PM' },
    { date: new Date(Date.now() + 86400000 * 5), title: 'Math Quiz', type: 'assignment', time: '02:00 PM' },
    { date: new Date(Date.now() - 86400000 * 2), title: 'Calculus III Over...', type: 'class', time: '09:00 AM' },
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCells = () => {
    const cells = [];
    const today = new Date();
    
    // Empty cells before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
        cells.push(<div key={`empty-${i}`} className="calendar-cell empty" style={{ minHeight: '130px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', opacity: 0.3 }}></div>);
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
        const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
        const isToday = d === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
        
        const dayEvents = events.filter(e => e.date.getDate() === d && e.date.getMonth() === currentDate.getMonth() && e.date.getFullYear() === currentDate.getFullYear());

        cells.push(
            <div key={`day-${d}`} className="calendar-cell" style={{ 
                minHeight: '130px', 
                background: isToday ? 'var(--color-primary-light)' : 'var(--color-surface-raised)', 
                border: isToday ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', 
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: isToday ? '0 4px 12px rgba(var(--color-primary-rgb), 0.15)' : 'none',
                transition: 'transform 0.2s',
                cursor: 'pointer'
            }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <span style={{ 
                        fontWeight: '800', 
                        fontSize: 'var(--text-xl)',
                        color: isToday ? 'var(--color-primary)' : 'var(--color-text-primary)'
                    }}>{d}</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
                    {dayEvents.map((evt, idx) => (
                        <div key={idx} style={{
                            padding: '6px 8px',
                            background: evt.type === 'class' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: evt.type === 'class' ? '#0ea5e9' : '#ef4444',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            lineHeight: 1.2
                        }} title={`${evt.title} at ${evt.time}`}>
                            {evt.type === 'class' ? <Video size={10} style={{ flexShrink: 0 }} /> : <FileText size={10} style={{ flexShrink: 0 }} />}
                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{evt.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return cells;
  };

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-header-inner" style={{ alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">My Calendar</h1>
            <p className="page-subtitle">Track your upcoming classes, assignments, and exams.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--color-surface)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <button onClick={prevMonth} className="btn btn-ghost btn-sm" style={{ padding: '8px', border: '1px solid var(--color-border)' }}>
                <ChevronLeft size={20} />
            </button>
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', minWidth: '160px', textAlign: 'center' }}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button onClick={nextMonth} className="btn btn-ghost btn-sm" style={{ padding: '8px', border: '1px solid var(--color-border)' }}>
                <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--space-6)', overflowX: 'auto', background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '16px', minWidth: '800px' }}>
              {/* Weekdays */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{ textAlign: 'center', fontWeight: '800', color: 'var(--color-text-secondary)', paddingBottom: '16px', fontSize: 'var(--text-sm)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {day}
                  </div>
              ))}
              
              {/* Calendar Grid */}
              {renderCells()}
          </div>
      </div>
    </div>
  );
};

export default MyCalendar;
