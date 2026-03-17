"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@repo/ui/components/button";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Target,
  LayoutDashboard,
  Zap,
  Globe,
  Milestone,
  Atom,
  FlaskConical
} from "lucide-react";
import { useRouter } from "next/navigation";

const grades = [
  { id: 8, label: "Grade 8", desc: "Middle School Foundation", icon: GraduationCap },
  { id: 9, label: "Grade 9", desc: "Early High School Prep", icon: Sparkles },
  { id: 10, label: "Grade 10", desc: "Board Exam Mastery", icon: Target },
];

const subjects = [
  { id: "math", name: "Mathematics", icon: Milestone, color: "text-blue-500" },
  { id: "physics", name: "Physics", icon: Atom, color: "text-indigo-500" },
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, color: "text-purple-500" },
  { id: "biology", name: "Biology", icon: Zap, color: "text-emerald-500" },
  { id: "english", name: "English", icon: Sparkles, color: "text-orange-500" },
  { id: "social", name: "Social Studies", icon: Globe, color: "text-teal-500" },
];

const goals = [
  { id: "boards", label: "Score 90%+ in boards", icon: Target },
  { id: "concepts", label: "Understand tough concepts", icon: Sparkles },
  { id: "syllabus", label: "Finish syllabus fast", icon: Zap },
  { id: "topper", label: "Top the class", icon: GraduationCap },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => i === 4 ? router.push("/dashboard") : setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleSubject = (id: string) => {
    setSelectedSubjects(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const steps = [
    { title: "Choose Your Grade", subtitle: "Select your current academic year to personalize your curriculum." },
    { title: "Pick Your Subjects", subtitle: "What would you like to master first? You can change these later." },
    { title: "Set Your Goal", subtitle: "What's the main target you want to achieve with Base Learn?" },
    { title: "Meet Your Dashboard", subtitle: "You're all set! Let's take a quick look at your new learning home." },
  ];

  return (
    <div className="min-h-screen bg-bg-soft flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-4xl space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map(s => (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${s === step ? 'w-10 bg-primary' : s < step ? 'w-4 bg-primary/40' : 'w-4 bg-border-main'}`} 
                />
              ))}
            </div>
          </div>
          <motion.h1 
            key={step + "title"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-text-main"
          >
            {steps[step-1].title}
          </motion.h1>
          <motion.p 
            key={step + "sub"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-muted text-lg max-w-2xl mx-auto"
          >
            {steps[step-1].subtitle}
          </motion.p>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {grades.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrade(g.id)}
                    className={`soft-card p-10 flex flex-col items-center text-center gap-6 group transition-all transform hover:scale-105 active:scale-95 ${selectedGrade === g.id ? 'ring-2 ring-primary border-primary' : ''}`}
                  >
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transition-colors ${selectedGrade === g.id ? 'bg-primary text-white' : 'bg-primary-light text-primary group-hover:bg-primary group-hover:text-white'}`}>
                      <g.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-main mb-2">{g.label}</h3>
                      <p className="text-text-muted text-sm">{g.desc}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
              >
                {subjects.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`soft-card p-8 flex flex-col items-center gap-4 transition-all duration-300 ${selectedSubjects.includes(sub.id) ? 'ring-2 ring-primary border-primary bg-primary/5' : ''}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-border-soft ${selectedSubjects.includes(sub.id) ? 'bg-primary text-white' : 'bg-white ' + sub.color}`}>
                      <sub.icon className="w-7 h-7" />
                    </div>
                    <span className="font-bold text-text-main">{sub.name}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSubjects.includes(sub.id) ? 'bg-primary border-primary text-white' : 'border-border-main'}`}>
                      {selectedSubjects.includes(sub.id) && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-xl mx-auto space-y-4"
              >
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`w-full soft-card p-6 flex items-center gap-6 text-left transition-all ${selectedGoal === goal.id ? 'ring-2 ring-primary border-primary bg-primary/5' : 'hover:bg-white'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${selectedGoal === goal.id ? 'bg-primary text-white' : 'bg-primary-light text-primary'}`}>
                      <goal.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-bold text-text-main">{goal.label}</span>
                    <div className="ml-auto">
                      <div className={`w-6 h-6 rounded-full border-2 transition-colors ${selectedGoal === goal.id ? 'bg-primary border-primary animate-ring' : 'border-border-main'}`} />
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-8 py-10"
              >
                <div className="relative w-fit mx-auto">
                   <div className="absolute -inset-10 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                   <div className="relative glass-panel p-10 rounded-[2.5rem] border-white/50 shadow-2xl">
                      <LayoutDashboard className="w-24 h-24 text-primary" />
                   </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-text-main">Ready to soar, Arjun?</h3>
                  <p className="text-text-muted max-w-md mx-auto">Your personalized dashboard, course roadmap and schedules are ready for you. Let's make this year your best one yet!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-12 border-t border-border-soft">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={step === 1}
            className="flex items-center gap-2 text-text-muted hover:text-text-main font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={step === 4 ? () => router.push("/dashboard") : () => setStep(step + 1)} 
            disabled={
              (step === 1 && !selectedGrade) ||
              (step === 2 && selectedSubjects.length === 0) ||
              (step === 3 && !selectedGoal)
            }
            className="h-14 px-10 bg-primary text-white font-bold rounded-xl shadow-ocean transform hover:scale-105 transition-all text-lg flex items-center gap-2 disabled:opacity-50 disabled:scale-100"
          >
            {step === 4 ? "Enter Dashboard" : "Continue"}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
