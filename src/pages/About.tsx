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
            {[1,2,3,4].map((i) => (
              <div key={i} className="card p-6 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-surface-container-high mb-4"></div>
                <h3 className="font-bold text-lg">Team Member {i}</h3>
                <p className="text-secondary text-sm font-medium mb-3">Role</p>
                <p className="text-on-surface-variant text-sm">Passionate about education and technology.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
