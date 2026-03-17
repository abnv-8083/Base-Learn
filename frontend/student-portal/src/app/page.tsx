"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Target, 
  Play, 
  Users, 
  CheckCircle2, 
  Star,
  ChevronDown,
  Globe,
  Database,
  Search,
  BookOpen,
  GraduationCap,
  History,
  FlaskConical,
  Atom,
  Languages,
  Milestone
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const subjects = [
  { name: "Mathematics", icon: Milestone, color: "from-blue-500 to-indigo-600", topics: ["Algebra", "Geometry", "Calculus"] },
  { name: "Physics", icon: Atom, color: "from-indigo-500 to-purple-600", topics: ["Mechanics", "Optics", "Modern Physics"] },
  { name: "Chemistry", icon: FlaskConical, color: "from-purple-500 to-pink-600", topics: ["Organic", "Inorganic", "Physical"] },
  { name: "Biology", icon: Zap, color: "from-emerald-500 to-teal-600", topics: ["Botany", "Zoology", "Genetics"] },
  { name: "English", icon: Languages, color: "from-orange-500 to-red-600", topics: ["Grammar", "Literature", "Writing"] },
  { name: "Social Studies", icon: Globe, color: "from-teal-500 to-cyan-600", topics: ["History", "Geography", "Civics"] },
];

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-bg-soft selection:bg-primary-light selection:text-primary overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-border-soft px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="text-2xl font-display font-bold text-text-main tracking-tight">Base Learn</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#subjects" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Subjects</a>
          <a href="#how-it-works" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">How it Works</a>
          <a href="#pricing" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Pricing</a>
          <Link href="/login">
            <Button variant="ghost" className="text-text-main font-bold">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-primary text-white px-6 rounded-btn hover:bg-primary-dark shadow-ocean transform hover:scale-105 transition-all">
              Join Free
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <motion.div 
          style={{ y: heroBgY }}
          className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none"
        >
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-20 w-[600px] h-[600px] bg-indigo-500/5 blur-[150px] rounded-full" />
        </motion.div>

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/10 text-primary font-bold text-sm mb-4"
          >
            <Sparkles className="w-4 h-4 fill-primary" />
            Empowering Grade 8-10 Students
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display md:text-8xl text-text-main mb-6 leading-tight tracking-tighter"
          >
            Learn. <span className="text-gradient">Score.</span> Repeat.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            Master tough concepts with India's most interactive recorded sessions designed specifically for middle school toppers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10"
          >
            <Link href="/register">
              <Button size="lg" className="h-16 px-10 bg-primary text-white text-lg rounded-btn hover:bg-primary-dark shadow-2xl shadow-primary/20 transform hover:scale-105 transition-all w-full sm:w-auto">
                Start Learning Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="h-16 px-10 text-text-main text-lg hover:bg-white/50 backdrop-blur-sm rounded-btn border border-border-soft w-full sm:w-auto">
              <Play className="mr-2 w-5 h-5 fill-primary text-primary" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Floating Element Placeholder */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mt-20 relative w-fit mx-auto"
          >
            <div className="absolute -inset-10 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
            <div className="relative glass-panel p-8 rounded-[2rem] border-white/40 shadow-2xl">
              <BookOpen className="w-24 h-24 text-primary opacity-90" />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Atom className="w-6 h-6 text-indigo-500 animate-spin-slow" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-border-soft py-12 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { label: "Students", value: "12,000+", icon: Users },
            { label: "Classes", value: "500+", icon: BookOpen },
            { label: "Improvement", value: "95%", icon: Target },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-text-main">{stat.value}</div>
              <div className="text-text-muted font-medium uppercase tracking-widest text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subject Cards */}
      <section id="subjects" className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main">Master Every Subject</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">Click on a subject to see the overview of what we cover in our comprehensive modules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((sub, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group soft-card p-1 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${sub.color}`} />
                <div className="p-8 space-y-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-white shadow-lg`}>
                    <sub.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main">{sub.name}</h3>
                  <ul className="space-y-3">
                    {sub.topics.map((topic, j) => (
                      <li key={j} className="flex items-center gap-2 text-text-muted">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-primary-light transition-colors p-6 rounded-xl border border-border-soft">
                    Explore Syllabus
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-20 relative">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main">3 Steps to Success</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-dashed border-t-2 border-dashed border-border-soft -translate-y-1/2 z-0" />
            {[
              { step: "01", title: "Sign Up", desc: "Create your free account in 30 seconds." },
              { step: "02", title: "Pick Subject", desc: "Choose your grade and subjects." },
              { step: "03", title: "Watch & Score", desc: "Start learning from experts." },
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-white p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-xl shadow-primary/20">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-text-main">{item.title}</h3>
                <p className="text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main">Class-wise Packages</h2>
            <p className="text-lg text-text-muted">Simple, transparent pricing for every student.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[8, 9, 10].map((grade) => (
              <div key={grade} className={`soft-card p-10 space-y-8 relative overflow-hidden ${grade === 10 ? 'ring-2 ring-primary border-primary' : ''}`}>
                {grade === 10 && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-xs font-bold rounded-bl-xl uppercase tracking-widest">
                    Best Seller
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-3xl font-display font-bold text-text-main">Grade {grade}</h3>
                  <div className="text-5xl font-bold text-text-main">Free <span className="text-lg text-text-muted font-medium">/ month</span></div>
                </div>
                <ul className="space-y-4 border-t border-border-soft pt-8">
                  {["All Subjects Included", "Recorded Sessions", "PDF Study Materials", "Doubt Forum Access", "Basic Chapter Tests"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-muted">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-14 bg-primary text-white font-bold rounded-xl mt-4">
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-main text-white py-20 px-6 mt-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Zap className="text-primary w-8 h-8 fill-primary" />
              <span className="text-2xl font-display font-bold">Base Learn</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              India's first premium e-learning platform dedicated purely to Grade 8, 9, and 10 success.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Study Materials</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Subjects</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Mathematics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Physics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Chemistry</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Biology</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Contact</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>arjun@antigravity.learn</li>
              <li>+91 98765 43210</li>
              <li>Antigravity Tower, Bangalore</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-20 mt-20 border-t border-white/10 text-center text-slate-500 text-sm">
          © 2026 Antigravity Labs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
