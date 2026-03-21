import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Video, Award, Target } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <style>{`
        .marquee-container {
          overflow: hidden;
          background: var(--color-bg);
          padding: var(--space-12) 0;
          position: relative;
          display: flex;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          gap: var(--space-6);
          min-width: max-content;
          animation: slide 30s linear infinite;
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - (var(--space-6) / 2))); }
        }

        .faculty-card {
          min-width: 320px;
          background: white;
          border-radius: 16px;
          padding: var(--space-6);
          display: flex;
          align-items: center;
          gap: var(--space-5);
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          border: 1px solid var(--color-border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .faculty-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
          border-color: var(--color-primary-light);
        }

        .faculty-photo {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary-light), var(--color-accent-subtle));
          border: 3px solid white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          object-fit: cover;
        }

        .faculty-badge {
          display: inline-block;
          background: var(--color-primary-light);
          color: var(--color-primary-dark);
          font-size: 12px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 12px;
          margin-top: 8px;
        }
      `}</style>
      
      {/* Topbar Navigation for Landing */}
      <header className="topbar" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--color-border)' }}>
        <div className="topbar-left">
          <Link to="/" className="sidebar-logo" style={{ textDecoration: 'none', border: 'none', padding: 0 }}>
            <div className="sidebar-logo-icon">🎓</div>
            <span className="sidebar-logo-text" style={{ color: 'var(--color-text-primary)' }}>Base<span style={{ color: 'var(--color-primary)' }}>Learn</span></span>
          </Link>
        </div>
        <div className="topbar-right">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost" style={{ marginRight: '12px' }}>Log In</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </>
          ) : (
            <>
              <span style={{ marginRight: '16px', fontWeight: 'bold' }}>Welcome, {user?.name?.split(' ')[0]}</span>
              <Link to={`/${user?.role}/dashboard`} className="btn btn-accent">Go to Dashboard</Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1 }}>
        <section style={{ 
          padding: 'var(--space-16) var(--space-10)', 
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Background Elements */}
          <div style={{
            position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
            background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)',
            top: '-200px', left: '-200px', pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', width: '800px', height: '800px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            bottom: '-400px', right: '-200px', pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)', marginBottom: 'var(--space-6)', display: 'inline-block', fontSize: 'var(--text-sm)', padding: '6px 16px' }}>
              Base Learn for Grades 8, 9 & 10
            </span>
            <h1 style={{ 
              fontSize: 'var(--text-5xl)', 
              fontWeight: 'var(--fw-extrabold)', 
              lineHeight: 1.1, 
              marginBottom: 'var(--space-6)',
              color: 'white',
              letterSpacing: '-0.03em'
            }}>
              Master Your Foundation.<br />
              <span style={{ color: 'var(--color-accent)' }}>Excel in High School.</span>
            </h1>
            <p style={{ 
              fontSize: 'var(--text-xl)', 
              color: 'rgba(255,255,255,0.8)', 
              marginBottom: 'var(--space-10)',
              maxWidth: '700px',
              margin: '0 auto var(--space-10)',
              lineHeight: 1.6
            }}>
              The ultimate learning platform designed exclusively for 8th, 9th, and 10th graders. Interactive live classes, recorded sessions, and smart assignments to boost your grades.
            </p>
            
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
              {!user ? (
                <>
                  <Link to="/register" className="btn btn-accent btn-lg" style={{ padding: '16px 40px', fontSize: 'var(--text-lg)' }}>Start Learning Today</Link>
                  <Link to="/login" className="btn btn-ghost btn-lg" style={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '16px 40px', fontSize: 'var(--text-lg)' }}>System Login</Link>
                </>
              ) : (
                <Link to={`/${user?.role}/dashboard`} className="btn btn-accent btn-lg" style={{ padding: '16px 40px', fontSize: 'var(--text-lg)' }}>Go To Portal</Link>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: 'var(--space-16) var(--space-10)', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-3)' }}>Everything you need to top your class.</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)' }}>Tailored specifically for the Grade 8, 9, and 10 curriculum.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div className="stat-card-icon" style={{ marginBottom: 'var(--space-5)', background: 'var(--color-student-light)', color: 'var(--color-student)' }}>
                <Video size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>Interactive Live Classes</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Join scheduled sessions with your professors, raise your hand, and learn in real-time.</p>
            </div>

            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div className="stat-card-icon" style={{ marginBottom: 'var(--space-5)', background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>Course Recordings</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Access past lectures instantly. Never worry about missing a critical concept again.</p>
            </div>

            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div className="stat-card-icon" style={{ marginBottom: 'var(--space-5)', background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>Smart Assignments</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Track deadlines, submit files securely, and receive detailed grading analytics.</p>
            </div>

            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div className="stat-card-icon" style={{ marginBottom: 'var(--space-5)', background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>Performance Tracking</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Visualize your mastery across different subjects with beautiful analytical dashboards.</p>
            </div>
          </div>
        </section>

        {/* Demo Videos Section */}
        <section style={{ padding: 'var(--space-16) var(--space-10)', background: 'var(--color-bg-alt)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
              <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-3)' }}>Experience Base Learn</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)' }}>Watch our top educators break down complex topics into simple concepts.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
              {/* Mathematics Demo */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '200px', background: 'var(--color-primary-dark)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                    <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid white', marginLeft: '6px' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>12:45</div>
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <span className="badge" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)', marginBottom: 'var(--space-3)', display: 'inline-block' }}>Grade 10 Math</span>
                  <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>Quadratic Equations Simplified</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>Master the core concepts of algebra with real-world examples.</p>
                </div>
              </div>

              {/* Science Demo */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '200px', background: 'var(--color-success)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                    <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid white', marginLeft: '6px' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>18:20</div>
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <span className="badge" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)', marginBottom: 'var(--space-3)', display: 'inline-block' }}>Grade 9 Science</span>
                  <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>Laws of Motion Explained</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>A visual breakdown of Newton's fundamental physics principles.</p>
                </div>
              </div>

              {/* English Demo */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '200px', background: 'var(--color-warning)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                    <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid white', marginLeft: '6px' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>15:10</div>
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <span className="badge" style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)', marginBottom: 'var(--space-3)', display: 'inline-block' }}>Grade 8 English</span>
                  <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>Advanced Grammar & Syntax</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>Build a strong foundation for essay writing and comprehension.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Your Faculty Section (Auto-Scrolling Marquee) */}
        <section style={{ padding: 'var(--space-10) 0', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-3)' }}>Learn from the Masters</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)' }}>Top 1% educators from across the country, dedicated to your success.</p>
          </div>
          
          <div className="marquee-container">
            <div className="marquee-track">
              {/* Card Group 1 */}
              <div className="faculty-card">
                <div className="faculty-photo" title="Photo placeholder"></div>
                <div className="faculty-info">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>Dr. Aryan Sharma</h4>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Ph.D. in Applied Mathematics</p>
                  <div className="faculty-badge">12+ Years Exp</div>
                </div>
              </div>

              <div className="faculty-card">
                <div className="faculty-photo" title="Photo placeholder"></div>
                <div className="faculty-info">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>Ms. Priya Menon</h4>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>M.Sc. Advanced Biology</p>
                  <div className="faculty-badge">8+ Years Exp</div>
                </div>
              </div>

              <div className="faculty-card">
                <div className="faculty-photo" title="Photo placeholder"></div>
                <div className="faculty-info">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>Prof. Vikram Singh</h4>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>M.Tech Physics, IIT Delhi</p>
                  <div className="faculty-badge">15+ Years Exp</div>
                </div>
              </div>

              <div className="faculty-card">
                <div className="faculty-photo" title="Photo placeholder"></div>
                <div className="faculty-info">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>Dr. Neha Gupta</h4>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>M.A. English Literature</p>
                  <div className="faculty-badge">10+ Years Exp</div>
                </div>
              </div>

              {/* Exact Duplicate Group 2 to make loop seamless */}
              <div className="faculty-card">
                <div className="faculty-photo" title="Photo placeholder"></div>
                <div className="faculty-info">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>Dr. Aryan Sharma</h4>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Ph.D. in Applied Mathematics</p>
                  <div className="faculty-badge">12+ Years Exp</div>
                </div>
              </div>

              <div className="faculty-card">
                <div className="faculty-photo" title="Photo placeholder"></div>
                <div className="faculty-info">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>Ms. Priya Menon</h4>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>M.Sc. Advanced Biology</p>
                  <div className="faculty-badge">8+ Years Exp</div>
                </div>
              </div>

              <div className="faculty-card">
                <div className="faculty-photo" title="Photo placeholder"></div>
                <div className="faculty-info">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>Prof. Vikram Singh</h4>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>M.Tech Physics, IIT Delhi</p>
                  <div className="faculty-badge">15+ Years Exp</div>
                </div>
              </div>

              <div className="faculty-card">
                <div className="faculty-photo" title="Photo placeholder"></div>
                <div className="faculty-info">
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>Dr. Neha Gupta</h4>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>M.A. English Literature</p>
                  <div className="faculty-badge">10+ Years Exp</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section style={{ padding: 'var(--space-16) var(--space-10)', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-3)' }}>Invest in Your Future</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)' }}>Simple, transparent pricing tailored for student success.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
            {/* Starter Plan */}
            <div className="card" style={{ padding: 'var(--space-8)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>Basic Revision</h3>
              <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>Free</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8) 0', color: 'var(--color-text-secondary)' }}>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-success)" /> Access to recorded crash courses</li>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-success)" /> Weekly chapter quizzes</li>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-success)" /> Basic progress analytics</li>
              </ul>
              <Link to="/register" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Get Started Free</Link>
            </div>

            {/* Pro Plan */}
            <div className="card" style={{ padding: 'var(--space-10)', border: '2px solid var(--color-primary)', background: 'var(--color-bg)', transform: 'scale(1.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <div style={{ background: 'var(--color-primary)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: 'var(--text-sm)', fontWeight: 'bold', display: 'inline-block', marginBottom: 'var(--space-4)' }}>Most Popular</div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>Pro Curriculum</h3>
              <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>₹999<span style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8) 0', color: 'var(--color-text-secondary)' }}>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-primary)" /> Daily Interactive Live Classes</li>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-primary)" /> Unlimited Assignment Submissions</li>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-primary)" /> Detailed Concept Notes & PDFs</li>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-primary)" /> Advanced Performance Tracking</li>
              </ul>
              <Link to="/register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Go Pro Today</Link>
            </div>

            {/* Elite Plan */}
            <div className="card" style={{ padding: 'var(--space-8)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>Elite Tutoring</h3>
              <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>₹2499<span style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8) 0', color: 'var(--color-text-secondary)' }}>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-success)" /> Everything in Pro</li>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-success)" /> 1-on-1 Mentorship Sessions</li>
                <li style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--color-success)" /> 24/7 Priority Doubt Resolution</li>
              </ul>
              <Link to="/register" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Contact Admissions</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: 'white', padding: 'var(--space-16) var(--space-10)', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-10)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-6)' }}>
              <div style={{ fontSize: '24px' }}>🎓</div>
              <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>Base<span style={{ color: 'var(--color-primary)' }}>Learn</span></span>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
              Transforming the Grade 8-10 learning experience with premium, interactive, and results-driven educational technology.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>Learning Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Live Classes</Link></li>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Recorded Sessions</Link></li>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Smart Assignments</Link></li>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Performance Tracking</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>About Base Learn</Link></li>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Careers</Link></li>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Terms of Service</Link></li>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li style={{ marginBottom: 'var(--space-3)' }}><Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: 'var(--space-10) auto 0', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <p>© {new Date().getFullYear()} Base Learn. Designed for educational excellence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
