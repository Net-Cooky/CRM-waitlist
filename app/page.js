'use client';
import { useState, useEffect } from 'react';
import { addToWaitlist, getWaitlistCount } from '../lib/supabase';
import { 
  Mail, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  Calendar, 
  CreditCard,
  Lock, 
  DollarSign, 
  Clock, 
  ClipboardList, 
  BarChart3, 
  Palette, 
  Building2, 
  Briefcase, 
  Target, 
  Zap, 
  Rocket, 
  Sparkles,
  Gift,
  Star,
  CheckCircle,
  Frown,
  Users
} from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(1247); // Default count
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch real waitlist count on component mount
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      const result = await getWaitlistCount();
      if (result.success) {
        setWaitlistCount(result.count);
      }
    };
    fetchWaitlistCount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await addToWaitlist(email, 'client_management', 'landing_page');
      
      if (result.success) {
        setIsSubmitted(true);
        // Update count with the real count from the server
        if (result.waitlistCount) {
          setWaitlistCount(result.waitlistCount);
        } else {
          setWaitlistCount(prev => prev + 1); // Fallback increment
        }
        console.log('Email successfully added to waitlist:', result.data);
      } else {
        setError(result.error || 'Failed to join waitlist');
        
        // Handle specific error codes for better UX
        if (result.code === 'DUPLICATE_EMAIL') {
          // For duplicate emails, we might want to show a different message
          console.log('Duplicate email attempt:', email);
        } else if (result.code === 'RATE_LIMITED') {
          // For rate limiting, we might want to disable the form temporarily
          console.log('Rate limited:', email);
        }
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ClientFlow
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-slate-300">
            <a href="#problem" className="hover:text-white transition-colors">Problem</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#audience" className="hover:text-white transition-colors">Who It's For</a>
            <a href="#story" className="hover:text-white transition-colors">Story</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
            <div className="flex flex-col space-y-4 pt-4 text-slate-300">
              <a 
                href="#problem" 
                className="hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Problem
              </a>
              <a 
                href="#features" 
                className="hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#audience" 
                className="hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Who It's For
              </a>
              <a 
                href="#story" 
                className="hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Story
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        {/* Hero Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-500/25 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-cyan-500/25 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Client Management
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              One platform for invoices, file sharing, contracts, and client communication. 
              Stop juggling multiple tools and start focusing on what matters.
            </p>
          </div>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mb-12">
            {!isSubmitted ? (
              <div>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Joining...
                      </div>
                    ) : (
                      'Join Waitlist'
                    )}
                  </button>
                </form>
                {error && (
                  <div className="mt-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-4">
                    <div className="text-red-400 font-medium text-sm">{error}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
                <div className="text-green-400 font-semibold mb-2">✓ You're on the list!</div>
                <p className="text-slate-300">We'll notify you when ClientFlow launches.</p>
              </div>
            )}
          </div>

          {/* Value Proposition */}
          <div className="text-slate-400">
            <p className="mb-6 text-lg">Built by freelancers, for freelancers</p>
            <div className="flex justify-center space-x-8 text-sm">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Launch discount available
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                No setup fees
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Direct founder support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="relative z-10 px-6 py-20 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sound familiar?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Most service providers juggle multiple tools, leading to chaos and lost opportunities
            </p>
          </div>

          {/* Problem Scenarios */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Scenario 1 */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-8 border border-red-500/20">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <Frown className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">The Daily Struggle</h3>
                  <p className="text-slate-300">"Where did I put that contract? Did they pay the invoice? I need to follow up on three projects..."</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm">Files scattered across email and cloud storage</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm">Manual payment reminders and follow-ups</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm">No clear project status or client communication</span>
                </div>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/20">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Tool Overload</h3>
                  <p className="text-slate-300">Switching between 5+ different apps just to manage one client relationship</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Gmail', icon: Mail, color: 'bg-blue-500/20' },
                  { name: 'Dropbox', icon: FolderOpen, color: 'bg-blue-600/20' },
                  { name: 'PayPal', icon: CreditCard, color: 'bg-blue-700/20' },
                  { name: 'Docs', icon: FileText, color: 'bg-green-500/20' },
                  { name: 'Slack', icon: MessageSquare, color: 'bg-purple-500/20' },
                  { name: 'Calendar', icon: Calendar, color: 'bg-red-500/20' }
                ].map((tool, index) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={index} className={`${tool.color} rounded-lg p-3 text-center border border-white/10`}>
                      <div className="flex justify-center mb-1">
                        <IconComponent className="w-4 h-4 text-slate-300" />
                      </div>
                      <div className="text-xs text-slate-300">{tool.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Solution Transition */}
          <div className="text-center relative">
            {/* Connecting Arrow */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-8">
              <div className="w-1 h-16 bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/20 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-50"></div>
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-400/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-400/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    What if there was a better way?
                  </span>
                </h3>
                
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                  One platform that brings together everything you need to manage clients professionally and efficiently.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    { icon: Target, title: 'Centralized', desc: 'All client data in one place' },
                    { icon: Zap, title: 'Automated', desc: 'Smart reminders and workflows' },
                    { icon: Rocket, title: 'Professional', desc: 'Impress clients with polish' }
                  ].map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
                        <p className="text-slate-400 text-sm">{benefit.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need to manage clients like a pro. No more juggling tools or missing deadlines.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: FolderOpen,
                title: 'Client Management',
                desc: 'Organize contacts, projects, and communication history in one beautiful dashboard.',
                gradient: 'from-blue-500/10 to-cyan-500/10',
                border: 'border-blue-500/20',
                iconBg: 'bg-blue-500/20',
                iconColor: 'text-blue-400'
              },
              {
                icon: BarChart3,
                title: 'Project Tracking',
                desc: 'Monitor progress, set milestones, and keep projects on track with visual timelines.',
                gradient: 'from-purple-500/10 to-pink-500/10',
                border: 'border-purple-500/20',
                iconBg: 'bg-purple-500/20',
                iconColor: 'text-purple-400'
              },
              {
                icon: DollarSign,
                title: 'Invoice & Payments',
                desc: 'Create professional invoices and track payments with automated reminders.',
                gradient: 'from-green-500/10 to-emerald-500/10',
                border: 'border-green-500/20',
                iconBg: 'bg-green-500/20',
                iconColor: 'text-green-400'
              },
              {
                icon: FileText,
                title: 'Smart Proposals',
                desc: 'Generate winning proposals with templates and e-signature integration.',
                gradient: 'from-orange-500/10 to-red-500/10',
                border: 'border-orange-500/20',
                iconBg: 'bg-orange-500/20',
                iconColor: 'text-orange-400'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-3xl p-8 border ${feature.border} hover:scale-105 transition-all duration-300 relative overflow-hidden group`}>
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.iconBg} rounded-2xl mb-6`}>
                      <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary Features */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: ClipboardList,
                title: 'Contract Management',
                description: 'Store, organize, and track all your client agreements. Digital signatures and version control included.',
                gradient: 'from-indigo-500/10 to-blue-500/10',
                border: 'border-indigo-500/20',
                iconBg: 'bg-indigo-500/20',
                iconColor: 'text-indigo-400'
              },
              {
                icon: BarChart3,
                title: 'Analytics Dashboard',
                description: 'Keep clients in the loop with real-time project updates, milestones, and progress tracking.',
                gradient: 'from-teal-500/10 to-green-500/10',
                border: 'border-teal-500/20',
                iconBg: 'bg-teal-500/20',
                iconColor: 'text-teal-400'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group">
                  <div className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-3xl p-8 border ${feature.border} hover:border-opacity-50 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden`}>
                    {/* Background decoration */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.iconBg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-7 h-7 ${feature.iconColor}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-slate-300 leading-relaxed text-lg">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to streamline your workflow?</h3>
              <p className="text-slate-300 mb-6">Be among the first to experience a better way to manage clients</p>
              <div className="flex justify-center space-x-6 text-sm text-slate-400">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Setup in minutes
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  No credit card required
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="audience" className="relative z-10 px-6 py-20 bg-slate-800/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Built for Professionals
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Whether you're a solo creator or growing team, ClientFlow adapts to your workflow
            </p>
          </div>

          {/* Audience Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Palette,
                title: 'Freelancers',
                subtitle: 'Designers & Developers',
                description: 'Focus on creating amazing work while we handle the business side.',
                gradient: 'from-blue-500/10 to-purple-500/10',
                border: 'border-blue-500/20',
                iconBg: 'bg-blue-500/20',
                iconColor: 'text-blue-400',
                features: ['Invoice automation', 'File organization', 'Payment tracking']
              },
              {
                icon: Building2,
                title: 'Small Agencies',
                subtitle: 'Growing Teams',
                description: 'Scale your client operations without the administrative overhead.',
                gradient: 'from-green-500/10 to-teal-500/10',
                border: 'border-green-500/20',
                iconBg: 'bg-green-500/20',
                iconColor: 'text-green-400',
                features: ['Team collaboration', 'Client portals', 'Project management']
              },
              {
                icon: Briefcase,
                title: 'Consultants',
                subtitle: 'Service Providers',
                description: 'Deliver professional experiences that wow your clients.',
                gradient: 'from-purple-500/10 to-pink-500/10',
                border: 'border-purple-500/20',
                iconBg: 'bg-purple-500/20',
                iconColor: 'text-purple-400',
                features: ['Professional branding', 'Contract management', 'Feedback collection']
              }
            ].map((audience, index) => {
              const IconComponent = audience.icon;
              return (
                <div key={index} className="group">
                  <div className={`bg-gradient-to-br ${audience.gradient} backdrop-blur-sm rounded-3xl p-8 border ${audience.border} hover:border-opacity-50 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden`}>
                    {/* Background decoration */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${audience.iconBg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-8 h-8 ${audience.iconColor}`} />
                      </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{audience.title}</h3>
                    <p className="text-blue-400 font-semibold mb-4">{audience.subtitle}</p>
                    <p className="text-slate-300 leading-relaxed mb-6">{audience.description}</p>
                    
                    {/* Feature List */}
                    <div className="space-y-2">
                      {audience.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-slate-400 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Founder Story */}
          <div id="story" className="text-center">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-600/30 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-8">Why I'm Building ClientFlow</h3>
              
              <div className="max-w-2xl mx-auto mb-8">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  As a freelancer, I was tired of juggling 5+ different tools just to manage one client project. 
                  Switching between email, invoicing apps, file storage, and project trackers was killing my productivity.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  ClientFlow brings everything into one beautiful, simple platform. No more context switching, 
                  no more missed deadlines, no more unprofessional client experiences.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl mb-3">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Focused</h4>
                  <p className="text-slate-400 text-sm">Built for one thing: client management done right</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-xl mb-3">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Simple</h4>
                  <p className="text-slate-400 text-sm">No bloat, no complexity, just what you need</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-xl mb-3">
                    <Rocket className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Fast</h4>
                  <p className="text-slate-400 text-sm">Get things done quickly, spend more time creating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-16 border border-blue-500/20 relative overflow-hidden">
              {/* Enhanced background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-50"></div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-8 animate-pulse-glow">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Ready to Transform
                  </span>
                  <br />
                  <span className="text-white">Your Business?</span>
                </h2>
                
                <p className="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Join the waitlist and be among the first to experience the future of client management.
                </p>
                
                {/* Enhanced Email Form */}
                {!isSubmitted ? (
                  <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
                      <div className="flex-1">
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                          className="w-full px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Joining...
                          </div>
                        ) : (
                          <span className="flex items-center">
                            Join Waitlist
                            <span className="ml-2">→</span>
                          </span>
                        )}
                      </button>
                    </form>
                    
                    {error && (
                      <div className="mb-8 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-6 max-w-md mx-auto">
                        <div className="text-red-400 font-medium">{error}</div>
                      </div>
                    )}
                    
                    {/* Benefits */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                      {[
                        { icon: Gift, title: 'Early Bird Pricing', desc: 'Save 50% on your first year', color: 'text-green-400' },
                        { icon: Rocket, title: 'Priority Access', desc: 'Be first to use new features', color: 'text-blue-400' },
                        { icon: Star, title: 'VIP Support', desc: 'Direct line to our team', color: 'text-purple-400' }
                      ].map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <div className="flex justify-center mb-3">
                              <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                            </div>
                            <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
                            <p className="text-slate-400 text-sm">{benefit.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-3xl p-12 mb-8">
                      <div className="flex justify-center mb-6">
                        <CheckCircle className="w-16 h-16 text-green-400" />
                      </div>
                      <div className="text-green-400 font-bold text-2xl mb-4">Welcome to the future!</div>
                      <p className="text-slate-300 text-lg">You're officially on the ClientFlow waitlist. We'll notify you as soon as we launch with your exclusive early access details.</p>
                    </div>
                  </div>
                )}
                
                {/* Trust Signals */}
                <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    Early access only
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                    No spam, ever
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                    Unsubscribe anytime
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-700/50">
        <div className="text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} ClientFlow. All rights reserved. Made with ❤️ for service providers.</p>
        </div>
      </footer>
    </div>
  );
}
