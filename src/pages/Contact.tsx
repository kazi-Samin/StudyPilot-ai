import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-5">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div>
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-on-surface-variant mb-8">Have questions about our platform or need support? We're here to help.</p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
              <div>
                <h4 className="font-bold text-lg">Address</h4>
                <p className="text-on-surface-variant">123 Learning Ave, Suite 400<br/>San Francisco, CA 94105</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">mail</span>
              <div>
                <h4 className="font-bold text-lg">Email</h4>
                <p className="text-on-surface-variant">support@studypilot.ai<br/>partnerships@studypilot.ai</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">phone</span>
              <div>
                <h4 className="font-bold text-lg">Phone</h4>
                <p className="text-on-surface-variant">+1 (555) 123-4567<br/>Mon-Fri 9am-5pm PST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none bg-surface-container-low" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none bg-surface-container-low" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none bg-surface-container-low" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none bg-surface-container-low"></textarea>
            </div>
            <button type="button" className="btn-primary w-full py-3 mt-2">Send Message</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
