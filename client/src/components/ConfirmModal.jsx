import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", confirmStyle = "danger" }) => {
    if (!isOpen) return null;

    const getConfirmColor = () => {
        if (confirmStyle === 'danger') return '#DC2626';
        if (confirmStyle === 'warning') return '#D97706';
        return '#0F2D6B';
    };

    return (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
            <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '90%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', position: 'relative', animation: 'fadeIn 0.2s ease-out' }}>
                <button 
                    onClick={onCancel}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                >
                    <X size={20} />
                </button>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: confirmStyle === 'danger' ? '#FEE2E2' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: getConfirmColor() }}>
                        <AlertTriangle size={28} />
                    </div>
                    
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0', color: 'var(--color-text-primary)' }}>{title}</h2>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 24px 0', lineHeight: 1.5 }}>{message}</p>
                    
                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                        <button 
                            onClick={onCancel} 
                            style={{ flex: 1, padding: '12px', background: '#F3F4F6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', color: '#4B5563' }}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={onConfirm} 
                            style={{ flex: 1, padding: '12px', background: getConfirmColor(), color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default ConfirmModal;
