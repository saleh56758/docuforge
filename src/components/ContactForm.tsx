'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Feedback', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Client-side submission handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
        Send Us a Message
      </h2>

      {submitted ? (
        <div className="alert-box alert-success" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CheckCircle2 size={24} style={{ color: 'var(--color-success)', flexShrink: 0 }} aria-hidden="true" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              Thank you for your message!
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              We review all technical inquiries and suggestions. If a response is required, we will reach out to you shortly.
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="controls-grid" style={{ marginBottom: '1.25rem' }}>
            <div className="control-group">
              <label className="control-label" htmlFor="contact-name">
                <span>Your Name</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Jane Doe"
                className="control-input"
              />
            </div>

            <div className="control-group">
              <label className="control-label" htmlFor="contact-email">
                <span>Email Address</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                className="control-input"
              />
            </div>
          </div>

          <div className="control-group" style={{ marginBottom: '1.25rem' }}>
            <label className="control-label" htmlFor="contact-subject">
              <span>Topic</span>
            </label>
            <select
              id="contact-subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="control-select"
            >
              <option value="Feedback">General Feedback</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Request New Tool</option>
              <option value="Business">Partnership / Advertising Inquiry</option>
            </select>
          </div>

          <div className="control-group" style={{ marginBottom: '1.5rem' }}>
            <label className="control-label" htmlFor="contact-msg">
              <span>Message</span>
            </label>
            <textarea
              id="contact-msg"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your question, request, or issue with as much detail as possible..."
              className="control-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{ minWidth: '160px' }}
          >
            <Send size={16} aria-hidden="true" /> {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
