import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-inverse-surface text-surface py-20 px-5 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-outline-variant leading-relaxed">
            We believe that everyone has the potential to learn anything. StudyPilot was built to democratize elite learning strategies using the power of cognitive science and artificial intelligence.
          </p>
        </div>
      </section>

      <section className="py-20 px-5 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">10M+</div>
            <div className="text-on-surface-variant font-medium">Study Hours Tracked</div>
          </div>
          <div className="p-6 border-y md:border-y-0 md:border-x border-outline-variant">
            <div className="text-4xl font-bold text-primary mb-2">50k+</div>
            <div className="text-on-surface-variant font-medium">Active Students</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-on-surface-variant font-medium">Grade Improvement</div>
          </div>
        </div>
      </section>

      <section className="py-20 px-5 bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl">person</span>
              </div>
              <h3 className="font-bold text-lg">Alex Mercer</h3>
              <p className="text-secondary text-sm font-medium mb-3">Founder & CEO</p>
              <p className="text-on-surface-variant text-sm">Former education researcher passionate about cognitive science.</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-secondary/20 text-secondary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl">psychology</span>
              </div>
              <h3 className="font-bold text-lg">Dr. Sarah Chen</h3>
              <p className="text-secondary text-sm font-medium mb-3">Head of AI</p>
              <p className="text-on-surface-variant text-sm">Lead architect behind our proprietary Cognitive AI Engine.</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-tertiary/20 text-tertiary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl">code</span>
              </div>
              <h3 className="font-bold text-lg">Marcus Johnson</h3>
              <p className="text-secondary text-sm font-medium mb-3">CTO</p>
              <p className="text-on-surface-variant text-sm">Scaling our infrastructure to support millions of learners.</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl">design_services</span>
              </div>
              <h3 className="font-bold text-lg">Elena Rodriguez</h3>
              <p className="text-secondary text-sm font-medium mb-3">Lead Designer</p>
              <p className="text-on-surface-variant text-sm">Crafting intuitive experiences for seamless studying.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
