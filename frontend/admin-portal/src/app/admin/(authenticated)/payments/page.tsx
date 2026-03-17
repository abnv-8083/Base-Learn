'use client';

import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, CreditCard, ArrowUpRight, 
  ArrowDownRight, MoreVertical, Plus, CheckCircle2, 
  XCircle, Clock, ExternalLink, ShieldCheck, 
  Package, LayoutGrid, List
} from 'lucide-react';
import styles from './payments.module.css';

const REVENUE_CARDS = [
  { title: "Today's Revenue", value: "$4,250", trend: "+12%", up: true },
  { title: "This Month (MTD)", value: "$62,400", trend: "+8.5%", up: true },
  { title: "All Time Revenue", value: "$1.2M", trend: "+25%", up: true },
  { title: "MRR Trend", value: "$48k", trend: "+5%", up: true },
];

const TRANSACTIONS = [
  { id: 'TXN-9021', name: 'Alex Davidson', plan: 'Pro', amount: '$49', date: 'Oct 17, 2025', method: 'Visa •• 4242', status: 'Success' },
  { id: 'TXN-9022', name: 'Sarah Miller', plan: 'Free', amount: '$0', date: 'Oct 17, 2025', method: 'N/A', status: 'Success' },
  { id: 'TXN-9023', name: 'James Wilson', plan: 'Pro', amount: '$49', date: 'Oct 16, 2025', method: 'Mastercard •• 8891', status: 'Failed' },
  { id: 'TXN-9024', name: 'Emma Thompson', plan: 'Premium', amount: '$99', date: 'Oct 16, 2025', method: 'PayPal', status: 'Success' },
  { id: 'TXN-9025', name: 'Michael Chang', plan: 'Free', amount: '$0', date: 'Oct 15, 2025', method: 'N/A', status: 'Refunded' },
];

const PLANS = [
  { name: 'Free Tier', price: '$0', users: '24,500', status: 'Active' },
  { name: 'Pro Monthly', price: '$49', users: '18,200', status: 'Active' },
  { name: 'Premium Annual', price: '$999', users: '2,541', status: 'Active' },
];

export default function PaymentsSubscriptions() {
  const [activeTab, setActiveTab] = useState('transactions');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Success': return <div className={`${styles.badge} ${styles.badgeSuccess}`}><CheckCircle2 size={12}/> Success</div>;
      case 'Failed': return <div className={`${styles.badge} ${styles.badgeDanger}`}><XCircle size={12}/> Failed</div>;
      case 'Refunded': return <div className={`${styles.badge} ${styles.badgeNeutral}`}><Clock size={12}/> Refunded</div>;
      default: return null;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Payments & Billing</h1>
          <p className={styles.subtitle}>Track revenue, manage subscription plans, and monitor financial health.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.gatewayStatus}>
            <ShieldCheck size={16} className={styles.shieldIcon} />
            <span>Stripe: Connected</span>
            <div className={styles.onlineDot}></div>
          </div>
          <button className={`btn btn-primary ${styles.btnFull}`}>
            <Plus size={18} /> New Plan
          </button>
        </div>
      </header>

      {/* Revenue Summary */}
      <section className={styles.revenueGrid}>
        {REVENUE_CARDS.map((card, i) => (
          <div key={i} className={`glass-panel ${styles.revenueCard}`}>
            <p className={styles.cardTitle}>{card.title}</p>
            <div className={styles.cardMain}>
              <h2 className={styles.cardValue}>{card.value}</h2>
              <div className={`${styles.trend} ${card.up ? styles.trendUp : styles.trendDown}`}>
                {card.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {card.trend}
              </div>
            </div>
            <div className={styles.cardBgIcon}>
              <DollarSign size={64} />
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Split */}
      <div className={styles.mainContent}>
        
        {/* Left: Transactions/Plans Table */}
        <div className={`glass-card ${styles.tableSection}`}>
          <div className={styles.tableHeader}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'transactions' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('transactions')}
              >
                Recent Transactions
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'plans' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('plans')}
              >
                Subscription Plans
              </button>
            </div>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Search..." className={styles.searchInput} />
            </div>
          </div>

          <div className={styles.tableWrapper}>
            {activeTab === 'transactions' ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Customer</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.map((txn, i) => (
                    <tr key={i} className={styles.row}>
                      <td className={styles.txnId}>{txn.id}</td>
                      <td>
                        <div className={styles.customerCell}>
                          <span className={styles.customerName}>{txn.name}</span>
                          <span className={styles.paymentMethod}>{txn.method}</span>
                        </div>
                      </td>
                      <td><span className={styles.planName}>{txn.plan}</span></td>
                      <td className={styles.amountCell}>{txn.amount}</td>
                      <td className={styles.dateCell}>{txn.date}</td>
                      <td>{getStatusBadge(txn.status)}</td>
                      <td className={styles.actionCell}>
                        <button className={styles.iconBtn}><ExternalLink size={16} /></button>
                        <button className={styles.iconBtn}><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.plansGrid}>
                {PLANS.map((plan, i) => (
                  <div key={i} className={styles.planCard}>
                    <div className={styles.planIcon}><Package size={24} /></div>
                    <div className={styles.planInfo}>
                      <h4 className={styles.planTitle}>{plan.name}</h4>
                      <p className={styles.planPrice}>{plan.price} / period</p>
                    </div>
                    <div className={styles.planStats}>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>Subscribers</span>
                        <span className={styles.statVal}>{plan.users}</span>
                      </div>
                    </div>
                    <button className={`btn btn-secondary ${styles.btnSm}`}>Edit Plan</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Funding / Payouts Widget */}
        <div className={styles.sidePanel}>
          <div className={`glass-card ${styles.payoutWidget}`}>
            <h3 className={styles.widgetTitle}>Instructor Payouts</h3>
            <p className={styles.widgetDesc}>Pending settlements for this cycle.</p>
            
            <div className={styles.payoutList}>
              {[
                { name: 'Dr. Sarah Connor', amount: '$2,450', date: 'Oct 20' },
                { name: 'Prof. Mark Taylor', amount: '$1,820', date: 'Oct 20' },
              ].map((p, i) => (
                <div key={i} className={styles.payoutItem}>
                  <div className={styles.payoutHeader}>
                    <span className={styles.payoutName}>{p.name}</span>
                    <span className={styles.payoutAmount}>{p.amount}</span>
                  </div>
                  <div className={styles.payoutFooter}>
                    <span className={styles.payoutDate}>Next Payout: {p.date}</span>
                    <button className={styles.btnSettle}>Settle Now</button>
                  </div>
                </div>
              ))}
            </div>
            <button className={`btn btn-primary ${styles.btnFull} ${styles.mt1}`}>
              Process All Payouts
            </button>
          </div>

          <div className={`glass-card ${styles.refundWidget}`}>
            <h3 className={styles.widgetTitle}>Pending Refunds</h3>
            <div className={styles.refundEmpty}>
              <div className={styles.emptyIcon}><CreditCard size={32} /></div>
              <p>No pending refund requests.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
