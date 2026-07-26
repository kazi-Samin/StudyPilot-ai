import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqs = [
    { question: "How does the Cognitive AI Engine work?", answer: "Our engine analyzes your learning patterns and uses spaced repetition algorithms to schedule review sessions right before you're likely to forget the material, maximizing retention." },
    { question: "Can I sync StudyPilot with my Google Calendar?", answer: "Yes! The Researcher plan includes full calendar integration, allowing you to sync your study blocks directly to Google Calendar, Apple Calendar, and Outlook." },
    { question: "Is the platform really free for students?", answer: "Our Scholar plan is 100% free forever. It includes all the basic features you need to generate study plans and track your progress. The Researcher plan offers advanced features for a monthly fee." },
    { question: "What subjects does StudyPilot support?", answer: "StudyPilot supports practically any subject! From complex mathematics and programming to history and languages, our AI can structure a learning path for any topic." },
    { question: "Can I share my study plans with classmates?", answer: "Absolutely. Both free and paid plans allow you to generate shareable links for your study plans so you can collaborate with your peers." }
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-on-surface tracking-tight leading-tight">
            Master your studies with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Cognitive AI</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10">
            StudyPilot analyzes your learning style and generates optimized, adaptive study plans that guarantee better retention and higher grades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-primary text-on-primary px-8 py-3 rounded-full font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all duration-200 inline-block text-lg">Start for free</Link>
            <Link to="/explore" className="bg-surface-container-high text-on-surface px-8 py-3 rounded-full font-semibold hover:bg-surface-container transition-all duration-200 inline-block border border-outline-variant text-lg">Explore Plans</Link>
          </div>
        </div>
      </section>

      {/* 2. Trusted By */}
      <section className="py-12 bg-surface border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12">
          <p className="text-center text-sm font-semibold text-outline tracking-widest uppercase mb-8">Trusted by students from</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-60 grayscale">
            <span className="text-2xl font-bold">Stanford</span>
            <span className="text-2xl font-bold">MIT</span>
            <span className="text-2xl font-bold">Harvard</span>
            <span className="text-2xl font-bold">Oxford</span>
          </div>
        </div>
      </section>

      {/* 3. Bento Grid Features */}
      <section className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to excel</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Our platform combines cutting-edge AI with proven cognitive science techniques.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            <div className="md:col-span-2 bg-surface-container rounded-[20px] p-8 border border-outline-variant flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-8 right-8 text-primary bg-primary/10 p-4 rounded-2xl">
                <span className="material-symbols-outlined text-4xl">psychology</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 z-10">Cognitive AI Engine</h3>
              <p className="text-on-surface-variant max-w-md z-10">Adapts to your learning pace and generates optimal spaced repetition schedules.</p>
            </div>
            <div className="bg-secondary/10 rounded-[20px] p-8 border border-outline-variant flex flex-col justify-end">
              <span className="material-symbols-outlined text-4xl text-secondary mb-auto">calendar_month</span>
              <h3 className="text-2xl font-bold mb-2">Smart Scheduling</h3>
              <p className="text-on-surface-variant">Syncs with your calendar automatically.</p>
            </div>
            <div className="bg-tertiary/10 rounded-[20px] p-8 border border-outline-variant flex flex-col justify-end">
              <span className="material-symbols-outlined text-4xl text-tertiary mb-auto">library_books</span>
              <h3 className="text-2xl font-bold mb-2">Resource Library</h3>
              <p className="text-on-surface-variant">Access thousands of pre-made plans.</p>
            </div>
            <div className="bg-primary/10 rounded-[20px] p-8 border border-outline-variant flex flex-col justify-end">
              <span className="material-symbols-outlined text-4xl text-primary mb-auto">group</span>
              <h3 className="text-2xl font-bold mb-2">Collaboration</h3>
              <p className="text-on-surface-variant">Study together with your peers.</p>
            </div>
            <div className="md:col-span-2 bg-inverse-surface text-surface rounded-[20px] p-8 border border-outline-variant flex flex-col justify-end">
              <span className="material-symbols-outlined text-4xl text-surface-container mb-auto">monitoring</span>
              <h3 className="text-2xl font-bold mb-2">Advanced Analytics</h3>
              <p className="text-outline-variant max-w-md">Track your progress, identify weak spots, and predict your exam performance with high accuracy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-16">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 z-10 relative">1</div>
              <h4 className="text-xl font-bold mb-3">Set your goals</h4>
              <p className="text-on-surface-variant">Tell us what you need to learn and when your deadlines are.</p>
              <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-outline-variant"></div>
            </div>
            <div className="text-center relative">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 z-10 relative">2</div>
              <h4 className="text-xl font-bold mb-3">AI generates your plan</h4>
              <p className="text-on-surface-variant">Our engine creates a structured, day-by-day schedule optimized for you.</p>
              <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-outline-variant"></div>
            </div>
            <div className="text-center relative">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 z-10 relative">3</div>
              <h4 className="text-xl font-bold mb-3">Execute and track</h4>
              <p className="text-on-surface-variant">Follow the daily tasks and watch your mastery score climb.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 5. Statistics/Counter */}
      <section className="py-16 bg-surface border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-on-surface-variant font-medium">Active Students</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">5K+</div>
              <div className="text-on-surface-variant font-medium">Study Plans</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-tertiary mb-2">98%</div>
              <div className="text-on-surface-variant font-medium">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-on-surface-variant font-medium">Subjects Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-16">Loved by students worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Medical Student", quote: "StudyPilot completely changed how I prepare for my board exams. The spaced repetition schedule is a lifesaver.", rating: 5 },
              { name: "David M.", role: "Computer Science Major", quote: "The advanced analytics helped me identify exactly which programming concepts I was struggling with. My grades went up instantly.", rating: 5 },
              { name: "Elena R.", role: "High School Senior", quote: "I used to feel so overwhelmed by my AP classes, but having a daily plan generated for me takes away all the anxiety.", rating: 5 }
            ].map((testimonial, i) => (
              <div key={i} className="bg-surface rounded-[20px] p-8 border border-outline-variant/50 shadow-sm">
                <div className="flex text-amber-400 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <span key={j} className="material-symbols-outlined fill-current">star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-outline">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pricing */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-16">Simple, transparent pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-surface rounded-[20px] shadow-sm border border-outline-variant/50 p-10 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Scholar</h3>
              <p className="text-on-surface-variant mb-6">Perfect for getting started</p>
              <div className="text-4xl font-bold mb-8">Free</div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span> Basic study plans</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span> Community access</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span> Standard templates</li>
              </ul>
              <Link to="/register" className="bg-surface-container-high text-on-surface px-6 py-2.5 rounded-full font-semibold hover:bg-surface-container transition-all duration-200 inline-block border border-outline-variant w-full text-center">Get Started</Link>
            </div>
            <div className="bg-inverse-surface text-surface rounded-[20px] p-10 flex flex-col border-none relative overflow-hidden shadow-lg">
              <div className="absolute top-5 right-5 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
              <h3 className="text-2xl font-bold mb-2">Researcher</h3>
              <p className="text-outline-variant mb-6">For serious academic performance</p>
              <div className="text-4xl font-bold mb-8">$12<span className="text-xl font-normal text-outline-variant">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-grow text-surface-container-high">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container">check_circle</span> Unlimited AI generations</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container">check_circle</span> Advanced analytics</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container">check_circle</span> Calendar integration</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container">check_circle</span> Priority support</li>
              </ul>
              <Link to="/register" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all duration-200 inline-block w-full text-center">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* 8. FAQ */}
      <section className="py-24 bg-background">
        <div className="max-w-[800px] mx-auto px-5 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-outline-variant rounded-[20px] overflow-hidden bg-surface transition-all duration-200">
                <button 
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <span className="material-symbols-outlined text-outline transition-transform duration-200" style={{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    expand_more
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-on-surface-variant">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Newsletter */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl font-bold mb-4">Stay ahead of the curve</h2>
          <p className="text-primary-container-low text-lg mb-8 text-on-primary-container">Join 10,000+ students getting study tips and platform updates.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="px-5 py-3 rounded-full text-on-surface flex-grow focus:outline-none focus:ring-2 focus:ring-secondary" />
            <button className="bg-secondary hover:bg-secondary-container hover:text-on-surface text-white px-8 py-3 rounded-full font-bold transition-colors">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
