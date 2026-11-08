'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';

/**
 * ============================================================================
 * WEB3FORMS ACCESS KEY CONFIGURATION
 * ============================================================================
 * To receive submissions directly at hassaansaleh56@gmail.com:
 * 1. Visit https://web3forms.com and enter hassaansaleh56@gmail.com to get your free Access Key.
 * 2. Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in the deployment environment.
 * ============================================================================
 */
export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? '';

export const CONTACT_EMAIL = 'hassaansaleh56@gmail.com';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: 'General Feedback',
    message: '',
    botcheck: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const validateField = (field: keyof FormState, value: string | boolean): string | undefined => {
    if (field === 'name') {
      const val = typeof value === 'string' ? value.trim() : '';
      if (!val) return 'Please enter your name.';
      if (val.length < 2) return 'Name must be at least 2 characters long.';
    }
    if (field === 'email') {
      const val = typeof value === 'string' ? value.trim() : '';
      if (!val) return 'Please enter your email address.';
      if (!validateEmail(val)) return 'Please enter a valid email address (e.g., name@example.com).';
    }
    if (field === 'subject') {
      const val = typeof value === 'string' ? value.trim() : '';
      if (!val) return 'Please select or enter a subject.';
    }
    if (field === 'message') {
      const val = typeof value === 'string' ? value.trim() : '';
      if (!val) return 'Please enter your message.';
      if (val.length < 15) return 'Message must be at least 15 characters long.';
    }
    return undefined;
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({ name: true, email: true, subject: true, message: true });

    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const subjectError = validateField('subject', formData.subject);
    const messageError = validateField('message', formData.message);

    if (nameError || emailError || subjectError || messageError) {
      setErrors({
        name: nameError,
        email: emailError,
        subject: subjectError,
        message: messageError
      });
      return;
    }

    // Bot detection via honeypot
    if (formData.botcheck) {
      // Silently pretend success to bots
      setSubmitStatus('success');
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setErrorMessage('We’re unable to accept messages through the form right now. Please email us directly.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      let response: Response;
      try {
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: `[DocuForge Contact] ${formData.subject}: ${formData.name.trim()}`,
            message: formData.message.trim(),
            from_name: 'DocuForge Contact Form',
            replyto: formData.email.trim(),
            botcheck: formData.botcheck ? 'true' : undefined
          })
        });
      } catch {
        setErrorMessage(
          'Your message could not be sent. Please check your connection and try again, or email us directly.'
        );
        setSubmitStatus('error');
        return;
      }

      let data: unknown;
      try {
        data = await response.json();
      } catch {
        setErrorMessage(
          'We couldn’t confirm that your message was sent. Please email us directly if you need to follow up.'
        );
        setSubmitStatus('error');
        return;
      }

      if (typeof data !== 'object' || data === null) {
        setErrorMessage(
          'We couldn’t confirm that your message was sent. Please email us directly if you need to follow up.'
        );
        setSubmitStatus('error');
        return;
      }

      const result = data as Record<string, unknown>;
      if (response.ok && result.success === true) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: 'General Feedback',
          message: '',
          botcheck: false
        });
        setTouched({});
        setErrors({});
      } else {
        // Surface a service-provided error when available.
        const apiError =
          (typeof result.message === 'string' && result.message) ||
          'We couldn’t send your message. Please try again or email us directly.';
        setErrorMessage(apiError);
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  return (
    <div
      className="contact-form-card"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.375rem' }}>
          Send a Message
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Fill out the form below to send us a message, or email{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>

      {submitStatus === 'success' ? (
        <div
          role="alert"
          aria-live="polite"
          className="alert-box alert-success"
          style={{
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1rem',
            background: 'var(--color-success-light)',
            border: '1px solid var(--color-success-border)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-success)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CheckCircle2 size={32} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Message Submitted
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
                Thank you for contacting DocuForge. For follow-up, email us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-primary)' }}>{CONTACT_EMAIL}</a>.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="btn-ghost"
            style={{ marginTop: '0.5rem' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
          {/* Honeypot field for spam prevention */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="contact-botcheck">Leave this field blank</label>
            <input
              id="contact-botcheck"
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              checked={formData.botcheck}
              onChange={(e) => handleChange('botcheck', e.target.checked)}
            />
          </div>

          {submitStatus === 'error' && (
            <div
              role="alert"
              aria-live="assertive"
              style={{
                marginBottom: '1.5rem',
                padding: '1rem 1.25rem',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                fontSize: '0.875rem'
              }}
            >
              <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <div>
                <strong>Unable to send message:</strong> {errorMessage}
                <div style={{ marginTop: '0.5rem' }}>
                  You can also email us directly at{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject || 'Direct Inquiry')}`}
                    style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 600 }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </div>
              </div>
            </div>
          )}

          <div className="controls-grid" style={{ marginBottom: '1.25rem' }}>
            <div className="control-group">
              <label className="control-label" htmlFor="contact-name">
                <span>Your Name <span style={{ color: '#ef4444' }} aria-hidden="true">*</span></span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="e.g., Alex Johnson"
                className="control-input"
                style={{
                  borderColor: errors.name ? '#ef4444' : undefined
                }}
              />
              {errors.name && (
                <span id="contact-name-error" style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertCircle size={12} aria-hidden="true" /> {errors.name}
                </span>
              )}
            </div>

            <div className="control-group">
              <label className="control-label" htmlFor="contact-email">
                <span>Email Address <span style={{ color: '#ef4444' }} aria-hidden="true">*</span></span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="alex@example.com"
                className="control-input"
                style={{
                  borderColor: errors.email ? '#ef4444' : undefined
                }}
              />
              {errors.email && (
                <span id="contact-email-error" style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertCircle size={12} aria-hidden="true" /> {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="control-group" style={{ marginBottom: '1.25rem' }}>
            <label className="control-label" htmlFor="contact-subject">
              <span>Subject / Topic <span style={{ color: '#ef4444' }} aria-hidden="true">*</span></span>
            </label>
            <select
              id="contact-subject"
              name="subject"
              required
              aria-required="true"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              onBlur={() => handleBlur('subject')}
              className="control-select"
            >
              <option value="General Feedback">General Feedback & Suggestions</option>
              <option value="Bug Report">Something Isn’t Working</option>
              <option value="Feature Request">Request a New Tool or Format</option>
              <option value="Privacy Inquiry">Privacy Question</option>
              <option value="Business / Advertising">Business or Partnership Inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="control-group" style={{ marginBottom: '1.5rem' }}>
            <label className="control-label" htmlFor="contact-message">
              <span>Message <span style={{ color: '#ef4444' }} aria-hidden="true">*</span></span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                (Minimum 15 characters)
              </span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              placeholder="Tell us how we can help. If you’re reporting a problem, mention the tool you were using."
              className="control-input"
              style={{
                resize: 'vertical',
                minHeight: '120px',
                borderColor: errors.message ? '#ef4444' : undefined
              }}
            />
            {errors.message && (
              <span id="contact-message-error" style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} aria-hidden="true" /> {errors.message}
              </span>
            )}
          </div>

          {/* Privacy Note */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.625rem',
              padding: '0.875rem 1rem',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: '1.5rem'
            }}
          >
            <div>
              We’ll use your information to respond to your inquiry. Please don’t include sensitive information. See our{' '}
              <Link href="/privacy" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                Privacy Policy
              </Link>
              .
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{
                minWidth: '180px',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spin-animation" aria-hidden="true" /> Sending Message...
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden="true" /> Send Message
                </>
              )}
            </button>

            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Prefer email? Contact us directly at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
